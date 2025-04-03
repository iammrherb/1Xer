/**
 * Aruba Wireless Configuration Template
 * For enterprise wireless with 802.1X authentication
 */
const arubaWirelessTemplate = {
    name: "Aruba Wireless",
    description: "802.1X configuration for Aruba wireless controllers",
    template: `! Aruba Wireless Configuration with 802.1X

! AAA Configuration
aaa authentication-server radius "{{radius.server1.name}}"
  host "{{radius.server1.ip}}"
  key "{{radius.server1.key}}"
  auth-port {{radius.server1.auth_port}}
  acct-port {{radius.server1.acct_port}}
  retransmit {{radius.retransmit}}
  timeout {{radius.timeout}}
  nas-identifier "{{radius.nas_id}}"
  nas-ip "{{radius.nas_ip}}"
  source-interface "{{radius.source_interface}}"

aaa authentication-server radius "{{radius.server2.name}}"
  host "{{radius.server2.ip}}"
  key "{{radius.server2.key}}"
  auth-port {{radius.server2.auth_port}}
  acct-port {{radius.server2.acct_port}}
  retransmit {{radius.retransmit}}
  timeout {{radius.timeout}}
  nas-identifier "{{radius.nas_id}}"
  nas-ip "{{radius.nas_ip}}"
  source-interface "{{radius.source_interface}}"

aaa server-group "{{radius.group_name}}"
  auth-server "{{radius.server1.name}}"
  auth-server "{{radius.server2.name}}"
  set dead-time {{radius.deadtime}}

aaa authentication dot1x "{{dot1x.profile_name}}"
  server-group "{{radius.group_name}}"
  enable

aaa profile "{{aaa.profile_name}}"
  authentication-dot1x "{{dot1x.profile_name}}"
  dot1x-default-role "{{dot1x.default_role}}"
  dot1x-server-group "{{radius.group_name}}"
  radius-accounting "{{radius.group_name}}"
  radius-interim-accounting

! CoA Configuration
aaa rfc-3576-server {{radius.server1.ip}}
  key {{radius.server1.key}}
aaa rfc-3576-server {{radius.server2.ip}}
  key {{radius.server2.key}}

! User Role Configuration
user-role "{{roles.unauthenticated}}"
  access-list session global-sacl
  access-list session captive-portal-sacl
  captive-portal

user-role "{{roles.authenticated}}"
  access-list session allowall
  access-list session ra-guard
  access-list session allowall
  access-list session ipv6-allowall

! SSID Configuration
wlan ssid-profile "{{ssid.profile_name}}"
  essid "{{ssid.name}}"
  type employee
  opmode wpa2-aes
  wpa-passphrase {{#if ssid.passphrase}}"{{ssid.passphrase}}"{{/if}}
  dtim-period 1
  max-authentication-failures 0
  auth-server {{radius.server1.name}}
  rf-band all
  captive-portal disable
  wmm
  wmm-uapsd
  wlan-beacon-interval {{ssid.beacon_interval}}
  {{#if ssid.dot1x}}
  802.11r 
  802.11r-default-mobility-domain {{ssid.mobility_domain}}
  {{/if}}
  {{#if ssid.pmf}}
  mfp-capable
  mfp-required
  {{/if}}

! End of Aruba Wireless configuration`,
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
        "radius.retransmit": {
            description: "RADIUS retransmit count",
            default: "3"
        },
        "radius.timeout": {
            description: "RADIUS server timeout (seconds)",
            default: "5"
        },
        "radius.deadtime": {
            description: "RADIUS server deadtime (minutes)",
            default: "15"
        },
        "radius.nas_id": {
            description: "RADIUS NAS identifier",
            default: "aruba-controller"
        },
        "radius.nas_ip": {
            description: "RADIUS NAS IP address",
            default: "10.1.100.1"
        },
        "radius.source_interface": {
            description: "Source interface for RADIUS packets",
            default: "vlan 100"
        },
        "radius.group_name": {
            description: "RADIUS server group name",
            default: "RADIUS-GROUP"
        },
        "dot1x.profile_name": {
            description: "802.1X authentication profile name",
            default: "DOT1X-PROFILE"
        },
        "dot1x.default_role": {
            description: "Default role for 802.1X authenticated users",
            default: "authenticated"
        },
        "aaa.profile_name": {
            description: "AAA profile name",
            default: "AAA-PROFILE"
        },
        "roles.unauthenticated": {
            description: "Role for unauthenticated users",
            default: "guest"
        },
        "roles.authenticated": {
            description: "Role for authenticated users",
            default: "employee"
        },
        "ssid.profile_name": {
            description: "SSID profile name",
            default: "CORP-SSID"
        },
        "ssid.name": {
            description: "WLAN SSID name",
            default: "Corporate-WLAN"
        },
        "ssid.passphrase": {
            description: "WPA2 PSK passphrase (if not using 802.1X)",
            default: ""
        },
        "ssid.beacon_interval": {
            description: "Beacon interval (ms)",
            default: "100"
        },
        "ssid.dot1x": {
            description: "Enable 802.1X authentication",
            default: true
        },
        "ssid.mobility_domain": {
            description: "802.11r mobility domain",
            default: "1234"
        },
        "ssid.pmf": {
            description: "Enable Protected Management Frames",
            default: true
        }
    }
};

// Export the template
if (typeof module !== 'undefined') {
    module.exports = arubaWirelessTemplate;
}
