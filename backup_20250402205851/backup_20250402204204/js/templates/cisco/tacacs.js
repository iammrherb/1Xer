/**
 * Cisco TACACS+ Configuration Template
 * For device administration
 */
const ciscoTacacsTemplate = {
    name: "Cisco TACACS+",
    description: "TACACS+ configuration for Cisco devices for administrative access",
    template: `! TACACS+ Configuration for Cisco IOS/IOS-XE
! AAA New Model
aaa new-model

! TACACS+ Server Definitions
tacacs server {{tacacs.server1.name}}
 address ipv4 {{tacacs.server1.ip}}
 key {{tacacs.server1.key}}
 timeout {{tacacs.timeout}}
 single-connection
tacacs server {{tacacs.server2.name}}
 address ipv4 {{tacacs.server2.ip}}
 key {{tacacs.server2.key}}
 timeout {{tacacs.timeout}}
 single-connection

! AAA Group Servers
aaa group server tacacs+ {{tacacs.group_name}}
 server name {{tacacs.server1.name}}
 server name {{tacacs.server2.name}}
 ip tacacs source-interface {{tacacs.source_interface}}

! Authentication Methods
aaa authentication login default group {{tacacs.group_name}} local
aaa authentication login CONSOLE local
aaa authentication enable default group {{tacacs.group_name}} enable

! Authorization Methods
aaa authorization config-commands
aaa authorization exec default group {{tacacs.group_name}} local if-authenticated
aaa authorization commands 0 default group {{tacacs.group_name}} local if-authenticated
aaa authorization commands 1 default group {{tacacs.group_name}} local if-authenticated
aaa authorization commands 15 default group {{tacacs.group_name}} local if-authenticated

! Accounting Methods
aaa accounting exec default start-stop group {{tacacs.group_name}}
aaa accounting commands 0 default start-stop group {{tacacs.group_name}}
aaa accounting commands 1 default start-stop group {{tacacs.group_name}}
aaa accounting commands 15 default start-stop group {{tacacs.group_name}}

! Local User (Fallback)
username {{local.admin_user}} privilege 15 secret {{local.admin_password}}

! Console and VTY Configuration
line console 0
 login authentication CONSOLE
 exec-timeout {{console.timeout}} 0
 
line vty 0 15
 login authentication default
 exec-timeout {{vty.timeout}} 0
 transport input ssh

! End of TACACS+ configuration`,
    variables: {
        "tacacs.server1.name": {
            description: "Primary TACACS+ server name",
            default: "TACACS-1"
        },
        "tacacs.server1.ip": {
            description: "Primary TACACS+ server IP address",
            default: "10.1.1.10"
        },
        "tacacs.server1.key": {
            description: "Primary TACACS+ server key",
            default: "tacacs_secret_key"
        },
        "tacacs.server2.name": {
            description: "Secondary TACACS+ server name",
            default: "TACACS-2"
        },
        "tacacs.server2.ip": {
            description: "Secondary TACACS+ server IP address",
            default: "10.1.1.11"
        },
        "tacacs.server2.key": {
            description: "Secondary TACACS+ server key",
            default: "tacacs_secret_key"
        },
        "tacacs.timeout": {
            description: "TACACS+ server timeout (seconds)",
            default: "5"
        },
        "tacacs.group_name": {
            description: "TACACS+ server group name",
            default: "TACACS-SERVERS"
        },
        "tacacs.source_interface": {
            description: "Source interface for TACACS+ packets",
            default: "Loopback0"
        },
        "local.admin_user": {
            description: "Local admin username (fallback)",
            default: "admin"
        },
        "local.admin_password": {
            description: "Local admin password (fallback)",
            default: "StrongP@ssw0rd"
        },
        "console.timeout": {
            description: "Console timeout (minutes)",
            default: "15"
        },
        "vty.timeout": {
            description: "VTY timeout (minutes)",
            default: "10"
        }
    }
};

// Export the template
if (typeof module !== 'undefined') {
    module.exports = ciscoTacacsTemplate;
}
