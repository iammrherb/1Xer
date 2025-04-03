/**
 * Cisco IOS-XE IBNS 2.0 Configuration Template
 * Based on best practices for 802.1X and MAB
 */
const ciscoIbns2IosXeTemplate = {
    name: "Cisco IOS-XE IBNS 2.0",
    description: "IBNS 2.0 configuration for Cisco IOS-XE devices with 802.1X and MAB support",
    template: `! IBNS 2.0 Configuration for Cisco IOS-XE
! AAA Configuration
aaa new-model
aaa authentication dot1x default group radius
aaa authorization network default group radius
aaa accounting dot1x default start-stop group radius

! RADIUS Server Configuration
radius server ISE-1
 address ipv4 {{radius.primary.ip}} auth-port {{radius.primary.auth_port}} acct-port {{radius.primary.acct_port}}
 key {{radius.primary.key}}
radius server ISE-2
 address ipv4 {{radius.secondary.ip}} auth-port {{radius.secondary.auth_port}} acct-port {{radius.secondary.acct_port}}
 key {{radius.secondary.key}}

! RADIUS Server Group Configuration
aaa group server radius ISE
 server name ISE-1
 server name ISE-2
 deadtime {{radius.deadtime}}
 ip radius source-interface {{radius.source_interface}}

! CoA Configuration
aaa server radius dynamic-author
 client {{radius.primary.ip}} server-key {{radius.primary.key}}
 client {{radius.secondary.ip}} server-key {{radius.secondary.key}}
 auth-type any
 port {{radius.coa_port}}

! RadSec Configuration (if enabled)
{{#if radsec.enabled}}
crypto pki trustpoint RADSEC-TP
 enrollment terminal
 revocation-check none
 subject-name cn={{radsec.subject_name}}
crypto pki certificate chain RADSEC-TP
 certificate ca 01
  ! Insert CA certificate here
radius server RADSEC-1
 address ipv4 {{radsec.primary.ip}} auth-port 2083 acct-port 2083
 key {{radsec.primary.key}}
 tls connectiontimeout 5
 tls radius-enable
{{/if}}

! Device Tracking Configuration
device-tracking policy TRACK-POLICY
 tracking enable
 device-role host
device-tracking logging theft
device-tracking tracking
ip dhcp snooping
ip dhcp snooping vlan {{dhcp_snooping.vlans}}

! 802.1X Global Configuration
dot1x system-auth-control
dot1x critical eapol

! MAB Global Configuration
mab request format attribute 1 uppercase
mab request format attribute 2 uppercase
mab request format attribute 3 uppercase
mab request format attribute 4 uppercase
mab request format attribute 6 on

! Authentication Manager Configuration
authentication mac-move permit
authentication critical recovery timeout {{critical_auth.timeout}}
authentication timer restart {{auth_timers.restart}}
authentication timer reauthenticate {{auth_timers.reauthenticate}}
ip device tracking probe delay 10
ip device tracking probe count 3
ip device tracking probe auto-source

! Class Maps
class-map type control subscriber match-all DOT1X
 match method dot1x
class-map type control subscriber match-all MAB
 match method mab
class-map type control subscriber match-all DOT1X_FAILED
 match method dot1x
 match result-type method dot1x failure
class-map type control subscriber match-any IN_CRITICAL_AUTH
 match activated-service-template CRITICAL_AUTH_VLAN
class-map type control subscriber match-all AAA_SVR_DOWN_UNAUTHD_HOST
 match result-type aaa-timeout
 match authorization-status unauthorized
class-map type control subscriber match-all AAA_SVR_DOWN_AUTHD_HOST
 match result-type aaa-timeout
 match authorization-status authorized

! Policy Maps
policy-map type control subscriber PMAP_DOT1X
 event session-started match-all
  10 class always do-until-failure
   10 authenticate using dot1x priority 10
 event authentication-failure match-first
  10 class AAA_SVR_DOWN_UNAUTHD_HOST do-until-failure
   10 activate service-template CRITICAL_AUTH_VLAN
   20 authorize
   30 pause reauthentication
  20 class AAA_SVR_DOWN_AUTHD_HOST do-until-failure
   10 pause reauthentication
   20 authorize
  30 class DOT1X_FAILED do-until-failure
   10 authenticate using mab priority 20
  40 class always do-until-failure
   10 terminate dot1x
   20 terminate mab
   30 authentication-restart {{auth_timers.restart}}
 event agent-found match-all
  10 class always do-until-failure
   10 terminate mab
   20 authenticate using dot1x priority 10
 event aaa-available match-all
  10 class IN_CRITICAL_AUTH do-until-failure
   10 clear-session
  20 class always do-until-failure
   10 resume reauthentication
 event inactivity-timeout match-all
  10 class always do-until-failure
   10 clear-session
 event authentication-success match-all
  10 class always do-until-failure
   10 activate service-template DEFAULT_CRITICAL_VOICE_TEMPLATE
 event violation match-all
  10 class always do-until-failure
   10 restrict

! Interface Template
interface {{interface}}
 switchport mode access
 switchport access vlan {{access_vlan}}
 switchport voice vlan {{voice_vlan}}
 access-session host-mode multi-auth
 access-session port-control auto
 access-session closed
 dot1x pae authenticator
 dot1x timeout tx-period {{dot1x_timers.tx_period}}
 dot1x max-reauth-req {{dot1x_timers.max_reauth_req}}
 dot1x max-req {{dot1x_timers.max_req}}
 spanning-tree portfast
 service-policy type control subscriber PMAP_DOT1X
 device-tracking attach-policy TRACK-POLICY
 ip access-group ACL_PREAUTH in

! Global Templates
service template CRITICAL_AUTH_VLAN
 access-group ACL_ALLOW_ALL
 vlan {{critical_auth.vlan}}
service template DEFAULT_CRITICAL_VOICE_TEMPLATE
 voice vlan {{voice_vlan}}

! ACL Definitions
ip access-list extended ACL_PREAUTH
 permit udp any any eq domain
 permit udp any any eq bootpc
 permit udp any any eq bootps
 deny   ip any any
ip access-list extended ACL_ALLOW_ALL
 permit ip any any

! End of configuration`,
    variables: {
        "radius.primary.ip": {
            description: "Primary RADIUS server IP address",
            default: "10.1.1.1"
        },
        "radius.primary.auth_port": {
            description: "Primary RADIUS authentication port",
            default: "1812"
        },
        "radius.primary.acct_port": {
            description: "Primary RADIUS accounting port",
            default: "1813"
        },
        "radius.primary.key": {
            description: "Primary RADIUS shared secret key",
            default: "secret"
        },
        "radius.secondary.ip": {
            description: "Secondary RADIUS server IP address",
            default: "10.1.1.2"
        },
        "radius.secondary.auth_port": {
            description: "Secondary RADIUS authentication port",
            default: "1812"
        },
        "radius.secondary.acct_port": {
            description: "Secondary RADIUS accounting port",
            default: "1813"
        },
        "radius.secondary.key": {
            description: "Secondary RADIUS shared secret key",
            default: "secret"
        },
        "radius.deadtime": {
            description: "RADIUS server deadtime in minutes",
            default: "15"
        },
        "radius.source_interface": {
            description: "Source interface for RADIUS packets",
            default: "Vlan100"
        },
        "radius.coa_port": {
            description: "CoA port",
            default: "1700"
        },
        "radsec.enabled": {
            description: "Enable RadSec",
            default: false
        },
        "radsec.subject_name": {
            description: "RadSec certificate subject name",
            default: "radsec.example.com"
        },
        "radsec.primary.ip": {
            description: "Primary RadSec server IP address",
            default: "10.1.1.1"
        },
        "radsec.primary.key": {
            description: "Primary RadSec shared secret key",
            default: "radsec_secret"
        },
        "dhcp_snooping.vlans": {
            description: "DHCP snooping VLANs",
            default: "10,20,30"
        },
        "critical_auth.timeout": {
            description: "Critical authentication recovery timeout in seconds",
            default: "180"
        },
        "critical_auth.vlan": {
            description: "Critical authentication VLAN",
            default: "999"
        },
        "auth_timers.restart": {
            description: "Authentication restart timer in seconds",
            default: "60"
        },
        "auth_timers.reauthenticate": {
            description: "Reauthentication timer in seconds",
            default: "7200"
        },
        "interface": {
            description: "Interface to configure",
            default: "GigabitEthernet1/0/1"
        },
        "access_vlan": {
            description: "Access VLAN",
            default: "10"
        },
        "voice_vlan": {
            description: "Voice VLAN",
            default: "20"
        },
        "dot1x_timers.tx_period": {
            description: "Dot1x transmit period in seconds",
            default: "10"
        },
        "dot1x_timers.max_reauth_req": {
            description: "Maximum reauthentication requests",
            default: "2"
        },
        "dot1x_timers.max_req": {
            description: "Maximum authentication requests",
            default: "2"
        }
    }
};

// Export the template
if (typeof module !== 'undefined') {
    module.exports = ciscoIbns2IosXeTemplate;
}
