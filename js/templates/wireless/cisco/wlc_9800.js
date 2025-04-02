/**
 * Cisco WLC 9800 Configuration Template
 * For wireless controller AAA configuration
 */
const ciscoWlc9800Template = {
    name: "Cisco WLC 9800",
    description: "AAA and RADIUS configuration for Cisco 9800 Series Wireless LAN Controllers",
    template: `! Cisco 9800 WLC AAA Configuration
! AAA New Model
aaa new-model

! RADIUS Server Configuration
radius server {{radius.server1.name}}
 address ipv4 {{radius.server1.ip}} auth-port {{radius.server1.auth_port}} acct-port {{radius.server1.acct_port}}
 key {{radius.server1.key}}
 timeout {{radius.timeout}}
 retransmit {{radius.retransmit}}
radius server {{radius.server2.name}}
 address ipv4 {{radius.server2.ip}} auth-port {{radius.server2.auth_port}} acct-port {{radius.server2.acct_port}}
 key {{radius.server2.key}}
 timeout {{radius.timeout}}
 retransmit {{radius.retransmit}}

! RADIUS Server Groups
aaa group server radius {{radius.group_name}}
 server name {{radius.server1.name}}
 server name {{radius.server2.name}}
 deadtime {{radius.deadtime}}
 ip radius source-interface {{radius.source_interface}}

! Authentication Methods
aaa authentication login default local
aaa authentication login {{radius.auth_list}} group {{radius.group_name}} local
aaa authentication dot1x {{radius.dot1x_list}} group {{radius.group_name}}

! Authorization Methods
aaa authorization network {{radius.auth_list}} group {{radius.group_name}} local
aaa authorization network default group {{radius.group_name}} local
aaa authorization credential-download {{radius.cred_list}} group {{radius.group_name}} local

! Accounting Methods
aaa accounting network {{radius.acct_list}} start-stop group {{radius.group_name}}
aaa accounting identity {{radius.identity_list}} start-stop group {{radius.group_name}}
aaa accounting update newinfo periodic {{radius.acct_update}}

! Local User (Fallback)
username {{local.admin_user}} privilege 15 secret {{local.admin_password}}

! Wireless Management VLAN
interface {{management.interface}}
 ip address {{management.ip}} {{management.mask}}
 no shutdown

! RADIUS CoA Configuration
aaa server radius dynamic-author
 client {{radius.server1.ip}} server-key {{radius.server1.key}}
 client {{radius.server2.ip}} server-key {{radius.server2.key}}
 auth-type all
 port {{radius.coa_port}}

! Wireless AAA Policy
wireless aaa policy {{aaa.policy_name}}
 aaa-override
 nac
 allowed-list list-name preauth_acl

! Wireless Policy Profile
wireless profile policy {{policy.profile_name}}
 aaa-policy {{aaa.policy_name}}
 accounting-list {{radius.acct_list}}
 vlan {{policy.vlan}}
 no shutdown

! Wireless SSID Configuration
wireless tag policy {{ssid.policy_tag}}
 wlan {{ssid.name}} {{ssid.id}} policy {{policy.profile_name}}

! WLAN Configuration
wlan {{ssid.name}} {{ssid.id}} {{ssid.name}}
 security wpa psk set-key ascii {{ssid.passphrase}} SET-KEY
 security wpa wpa2
 security wpa wpa2 ciphers aes
 no security wpa akm dot1x
 security wpa akm psk
 no shutdown

! End of Cisco 9800 WLC configuration`,
    variables: {
        "radius.server1.name": {
            description: "Primary RADIUS server name",
            default: "ISE-1"
        },
        "radius.server1.ip": {
            description: "Primary RADIUS server IP",
            default: "10.1.1.1"
        },
        "radius.server1.auth_port": {
            description: "Primary RADIUS authentication port",
            default: "1812"
        },
        "radius.server1.acct_port": {
            description: "Primary RADIUS accounting port",
            default: "1813"
        },
        "radius.server1.key": {
            description: "Primary RADIUS shared secret",
            default: "secret_key"
        },
        "radius.server2.name": {
            description: "Secondary RADIUS server name",
            default: "ISE-2"
        },
        "radius.server2.ip": {
            description: "Secondary RADIUS server IP",
            default: "10.1.1.2"
        },
        "radius.server2.auth_port": {
            description: "Secondary RADIUS authentication port",
            default: "1812"
        },
        "radius.server2.acct_port": {
            description: "Secondary RADIUS accounting port",
            default: "1813"
        },
        "radius.server2.key": {
            description: "Secondary RADIUS shared secret",
            default: "secret_key"
        },
        "radius.timeout": {
            description: "RADIUS server timeout (seconds)",
            default: "5"
        },
        "radius.retransmit": {
            description: "RADIUS retransmit count",
            default: "3"
        },
        "radius.deadtime": {
            description: "RADIUS server deadtime (minutes)",
            default: "15"
        },
        "radius.group_name": {
            description: "RADIUS server group name",
            default: "ISE-GROUP"
        },
        "radius.source_interface": {
            description: "Source interface for RADIUS packets",
            default: "Vlan100"
        },
        "radius.auth_list": {
            description: "Authentication list name",
            default: "ISE_AUTH"
        },
        "radius.dot1x_list": {
            description: "Dot1x authentication list name",
            default: "ISE_DOT1X"
        },
        "radius.acct_list": {
            description: "Accounting list name",
            default: "ISE_ACCT"
        },
        "radius.identity_list": {
            description: "Identity accounting list name",
            default: "ISE_IDENTITY"
        },
        "radius.cred_list": {
            description: "Credential download list name",
            default: "ISE_CRED"
        },
        "radius.acct_update": {
            description: "Accounting update interval (seconds)",
            default: "1800"
        },
        "radius.coa_port": {
            description: "CoA port number",
            default: "1700"
        },
        "local.admin_user": {
            description: "Local admin username",
            default: "admin"
        },
        "local.admin_password": {
            description: "Local admin password",
            default: "StrongP@ssw0rd"
        },
        "management.interface": {
            description: "Management interface",
            default: "Vlan100"
        },
        "management.ip": {
            description: "Management IP address",
            default: "10.1.100.1"
        },
        "management.mask": {
            description: "Management subnet mask",
            default: "255.255.255.0"
        },
        "aaa.policy_name": {
            description: "Wireless AAA policy name",
            default: "DEFAULT-AAA-POLICY"
        },
        "policy.profile_name": {
            description: "Wireless policy profile name",
            default: "DEFAULT-POLICY-PROFILE"
        },
        "policy.vlan": {
            description: "Wireless policy VLAN",
            default: "10"
        },
        "ssid.policy_tag": {
            description: "SSID policy tag",
            default: "DEFAULT-POLICY-TAG"
        },
        "ssid.name": {
            description: "WLAN SSID name",
            default: "Enterprise-WLAN"
        },
        "ssid.id": {
            description: "WLAN SSID ID",
            default: "1"
        },
        "ssid.passphrase": {
            description: "WLAN PSK passphrase (for PSK WLANs)",
            default: "Passw0rd!"
        }
    }
};

// Export the template
if (typeof module !== 'undefined') {
    module.exports = ciscoWlc9800Template;
}
