function showTab(tabName, event) {
  var tabs = document.getElementsByClassName('tab-content');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  var btns = document.getElementsByClassName('tab-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  document.getElementById(tabName).style.display = "block";
  if (event) { event.target.classList.add('active'); }
}

function updatePlatformInfo() {
  var platform = document.getElementById('platform').value;
  console.log("Selected platform: " + platform);
  // Optionally update UI hints based on platform.
}

function generateConfig() {
  var platform = document.getElementById('platform').value;
  var dataVlan = document.getElementById('data_vlan').value;
  var guestVlan = document.getElementById('guest_vlan').value || "Not Set";
  var criticalVlan = document.getElementById('critical_vlan').value || "Not Set";
  var useRadius = document.getElementById('use_radius').checked;
  var useTacacs = document.getElementById('use_tacacs').checked;
  var useLocal = document.getElementById('use_local').checked;
  var useRadsec = document.getElementById('use_radsec').checked;
  var authMode = document.querySelector('input[name="auth_mode"]:checked').value;
  var useMab = document.getElementById('use_mab').checked;
  var useCoa = document.getElementById('use_coa').checked;
  var useIbnS = document.getElementById('use_ibns').checked;
  
  var config = "=== Generated Configuration ===\n";
  config += "Platform: " + platform + "\n";
  config += "Data VLAN: " + dataVlan + "\nGuest VLAN: " + guestVlan + "\nCritical VLAN: " + criticalVlan + "\n";
  config += "Authentication Mode: " + authMode + "\n";
  config += "Options:\n";
  config += "  RADIUS: " + (useRadius ? "Enabled" : "Disabled") + "\n";
  config += "  TACACS+: " + (useTacacs ? "Enabled" : "Disabled") + "\n";
  config += "  Local AAA: " + (useLocal ? "Enabled" : "Disabled") + "\n";
  config += "  RADSEC: " + (useRadsec ? "Enabled" : "Disabled") + "\n";
  config += "  MAB Fallback: " + (useMab ? "Enabled" : "Disabled") + "\n";
  config += "  CoA: " + (useCoa ? "Enabled" : "Disabled") + "\n";
  config += "  IBNS (Cisco): " + (useIbnS ? "Enabled" : "Disabled") + "\n\n";
  config += "[Insert vendor-specific CLI blocks here from the templates in the 'templates' directory]\n";
  document.getElementById('configOutput').textContent = config;
}

function sendAIQuery() {
  var query = document.querySelector('#aiChat textarea').value;
  document.getElementById('aiResponse').innerHTML = "<p>AI Response for: " + query + "</p>";
}

document.addEventListener('DOMContentLoaded', function() {
  showTab('configurator');
});
