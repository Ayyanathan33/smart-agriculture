// KisanPulse AI Engine & Live Internet Knowledge Settings Widget
(function () {
  function createWidget() {
    // Floating Pill Button
    const btn = document.createElement('button');
    btn.id = 'ai-engine-pill';
    btn.setAttribute('aria-label', 'AI Engine & Internet Research Settings');
    btn.style.cssText = `
      position: fixed;
      bottom: 84px;
      right: 20px;
      z-index: 99999;
      background: rgba(6, 78, 59, 0.95);
      backdrop-filter: blur(10px);
      color: #ffffff;
      border: 1px solid rgba(16, 185, 129, 0.4);
      padding: 9px 16px;
      border-radius: 9999px;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.28), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 9px;
      transition: all 0.2s ease;
    `;
    btn.innerHTML = `
      <span id="ai-pill-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
      <span id="ai-pill-label">✨ Gemini + ChatGPT | 🌐 Live Web</span>
    `;

    btn.onmouseover = () => { btn.style.transform = 'translateY(-2px) scale(1.02)'; };
    btn.onmouseout = () => { btn.style.transform = 'translateY(0) scale(1)'; };

    // Modal Overlay
    const modal = document.createElement('div');
    modal.id = 'ai-engine-modal';
    modal.style.cssText = `
      display: none;
      position: fixed;
      inset: 0;
      z-index: 100000;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    `;

    modal.innerHTML = `
      <div style="
        background: #ffffff;
        color: #1c1917;
        width: 100%;
        max-width: 540px;
        max-height: 90vh;
        border-radius: 20px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        border: 1px solid #e7e5e4;
        overflow-y: auto;
        animation: aiModalFadeIn 0.2s ease-out;
      ">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); padding: 20px 24px; color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 2;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="background: rgba(255, 255, 255, 0.15); width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px;">
              🤖
            </div>
            <div>
              <h3 style="margin: 0; font-size: 16px; font-weight: 700; letter-spacing: -0.01em;">AI Engine & Live Web Knowledge</h3>
              <p style="margin: 2px 0 0 0; font-size: 11px; opacity: 0.85;">Gemini + ChatGPT (OpenAI) + Internet Disease Grounding</p>
            </div>
          </div>
          <button id="ai-close-modal" style="background: transparent; border: none; color: white; font-size: 22px; cursor: pointer; padding: 4px; line-height: 1;">&times;</button>
        </div>

        <div style="padding: 24px;">
          <!-- Status Banner -->
          <div id="ai-status-box" style="padding: 12px 16px; border-radius: 12px; font-size: 13px; margin-bottom: 20px; display: flex; align-items: flex-start; gap: 10px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46;">
            <span style="font-size: 18px; line-height: 1.2;">🌐</span>
            <div id="ai-status-text" style="font-size: 12px; line-height: 1.5;">Checking AI engine connection...</div>
          </div>

          <form id="ai-config-form" style="display: flex; flex-direction: column; gap: 18px;">
            <!-- Engine Selection Strategy -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
              <label style="display: block; font-size: 12px; font-weight: 700; color: #1e293b; margin-bottom: 6px;">
                ⚙️ Routing & Failover Engine
              </label>
              <select id="ai-select-engine" style="
                width: 100%;
                box-sizing: border-box;
                padding: 9px 12px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                font-size: 13px;
                background: white;
                outline: none;
                font-weight: 500;
              ">
                <option value="auto">Auto: Smart Failover (Gemini ↔ ChatGPT)</option>
                <option value="gemini">Google Gemini Primary (Failover to ChatGPT)</option>
                <option value="chatgpt">OpenAI ChatGPT Primary (Failover to Gemini)</option>
              </select>
              <p style="margin: 6px 0 0 0; font-size: 11px; color: #64748b;">
                Auto mode dynamically routes between models, guaranteeing zero downtime if Google or OpenAI experiences high demand or rate limits.
              </p>
            </div>

            <!-- Google Gemini Settings -->
            <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <label style="font-size: 12px; font-weight: 700; color: #292524; display: flex; align-items: center; gap: 6px;">
                  <span>✨</span> Google Gemini Multimodal
                </label>
                <span id="gemini-badge" style="font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: #e2e8f0; color: #475569;">Checking...</span>
              </div>
              <input id="gemini-input-key" type="password" placeholder="AIzaSy... (Gemini API Key)" style="
                width: 100%;
                box-sizing: border-box;
                padding: 9px 12px;
                border: 1px solid #d6d3d1;
                border-radius: 8px;
                font-size: 12px;
                font-family: 'JetBrains Mono', monospace;
                outline: none;
                margin-bottom: 6px;
              " />
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-bottom: 8px;">
                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener" style="color: #047857; text-decoration: underline;">
                  🔑 Get Gemini Key (Google AI Studio)
                </a>
                <span id="gemini-key-mask" style="font-family: monospace; color: #78716c;"></span>
              </div>
              <select id="gemini-select-model" style="
                width: 100%;
                box-sizing: border-box;
                padding: 7px 10px;
                border: 1px solid #d6d3d1;
                border-radius: 8px;
                font-size: 12px;
                background: white;
                outline: none;
              ">
                <option value="gemini-3.8-flash">gemini-3.8-flash (Latest Stable Multimodal Flash)</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash (Flash 2.0)</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash (Standard Flash)</option>
              </select>
            </div>

            <!-- OpenAI ChatGPT Settings -->
            <div style="background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <label style="font-size: 12px; font-weight: 700; color: #292524; display: flex; align-items: center; gap: 6px;">
                  <span>🤖</span> OpenAI ChatGPT (Vision & Agronomy)
                </label>
                <span id="openai-badge" style="font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 9999px; background: #e2e8f0; color: #475569;">Checking...</span>
              </div>
              <input id="openai-input-key" type="password" placeholder="sk-proj-... (OpenAI API Key)" style="
                width: 100%;
                box-sizing: border-box;
                padding: 9px 12px;
                border: 1px solid #d6d3d1;
                border-radius: 8px;
                font-size: 12px;
                font-family: 'JetBrains Mono', monospace;
                outline: none;
                margin-bottom: 6px;
              " />
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; margin-bottom: 8px;">
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener" style="color: #047857; text-decoration: underline;">
                  🔑 Get OpenAI Key (platform.openai.com)
                </a>
                <span id="openai-key-mask" style="font-family: monospace; color: #78716c;"></span>
              </div>
              <select id="openai-select-model" style="
                width: 100%;
                box-sizing: border-box;
                padding: 7px 10px;
                border: 1px solid #d6d3d1;
                border-radius: 8px;
                font-size: 12px;
                background: white;
                outline: none;
              ">
                <option value="gpt-4o-mini">gpt-4o-mini (Fast & Cost-Efficient Vision)</option>
                <option value="gpt-4o">gpt-4o (Flagship High-Precision Vision)</option>
              </select>
            </div>

            <!-- Live Internet Research Toggle -->
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px;">
              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer;">
                <input id="ai-toggle-internet" type="checkbox" checked style="margin-top: 3px; accent-color: #064e3b; width: 16px; height: 16px;" />
                <div>
                  <div style="font-size: 12px; font-weight: 700; color: #14532d;">
                    🌐 Live Internet Plant Pathology Research & Data Gathering
                  </div>
                  <div style="font-size: 11px; color: #166534; margin-top: 3px; line-height: 1.4;">
                    Before analyzing leaves, real-time research is retrieved from Wikipedia API & ICAR plant pathology databases. The AI model cross-references visible image symptoms against verified online disease data for high-confidence farmer diagnosis.
                  </div>
                </div>
              </label>
              <div style="margin-top: 10px; display: flex; gap: 8px;">
                <button type="button" id="preview-internet-btn" style="
                  background: #dcfce7;
                  border: 1px solid #86efac;
                  color: #15803d;
                  padding: 5px 10px;
                  border-radius: 6px;
                  font-size: 11px;
                  font-weight: 600;
                  cursor: pointer;
                ">
                  🔍 Test Live Web Data Fetch (Paddy/Blast)
                </button>
              </div>
              <div id="internet-preview-result" style="display: none; margin-top: 8px; padding: 8px 10px; background: #ffffff; border-radius: 6px; border: 1px solid #86efac; font-size: 11px; color: #166534; font-family: monospace; max-height: 120px; overflow-y: auto;"></div>
            </div>

            <div id="ai-msg" style="display: none; padding: 10px 12px; border-radius: 8px; font-size: 12px;"></div>

            <div style="display: flex; gap: 10px; margin-top: 4px;">
              <button type="submit" id="ai-save-btn" style="
                flex: 1;
                background: #064e3b;
                color: white;
                border: none;
                padding: 12px 16px;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.15s ease;
              ">
                Save & Update AI Configuration
              </button>
              <button type="button" id="ai-cancel-btn" style="
                background: #f5f5f4;
                color: #57534e;
                border: 1px solid #e7e5e4;
                padding: 12px 16px;
                border-radius: 10px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
              ">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(modal);

    // Style animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes aiModalFadeIn {
        from { opacity: 0; transform: scale(0.96) translateY(8px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
    `;
    document.head.appendChild(style);

    // Elements
    const pillDot = document.getElementById('ai-pill-dot');
    const pillLabel = document.getElementById('ai-pill-label');
    const statusBox = document.getElementById('ai-status-box');
    const statusText = document.getElementById('ai-status-text');

    const selectEngine = document.getElementById('ai-select-engine');
    const geminiBadge = document.getElementById('gemini-badge');
    const geminiInputKey = document.getElementById('gemini-input-key');
    const geminiKeyMask = document.getElementById('gemini-key-mask');
    const geminiSelectModel = document.getElementById('gemini-select-model');

    const openaiBadge = document.getElementById('openai-badge');
    const openaiInputKey = document.getElementById('openai-input-key');
    const openaiKeyMask = document.getElementById('openai-key-mask');
    const openaiSelectModel = document.getElementById('openai-select-model');

    const toggleInternet = document.getElementById('ai-toggle-internet');
    const previewInternetBtn = document.getElementById('preview-internet-btn');
    const previewResult = document.getElementById('internet-preview-result');

    const saveBtn = document.getElementById('ai-save-btn');
    const msgBox = document.getElementById('ai-msg');

    function updateStatusUI(data) {
      const { geminiConfigured, geminiModel, geminiMaskedKey, openaiConfigured, openaiModel, openaiMaskedKey, activeEngine, internetResearchEnabled } = data;

      // Update Badges
      if (geminiConfigured) {
        geminiBadge.textContent = 'Active';
        geminiBadge.style.background = '#dcfce7';
        geminiBadge.style.color = '#15803d';
        geminiKeyMask.textContent = geminiMaskedKey || 'Configured in .env';
      } else {
        geminiBadge.textContent = 'Not Set';
        geminiBadge.style.background = '#f1f5f9';
        geminiBadge.style.color = '#64748b';
        geminiKeyMask.textContent = 'None';
      }

      if (openaiConfigured) {
        openaiBadge.textContent = 'Active';
        openaiBadge.style.background = '#dcfce7';
        openaiBadge.style.color = '#15803d';
        openaiKeyMask.textContent = openaiMaskedKey || 'Configured in .env';
      } else {
        openaiBadge.textContent = 'Not Set';
        openaiBadge.style.background = '#f1f5f9';
        openaiBadge.style.color = '#64748b';
        openaiKeyMask.textContent = 'None';
      }

      if (geminiModel) geminiSelectModel.value = geminiModel;
      if (openaiModel) openaiSelectModel.value = openaiModel;
      if (activeEngine) selectEngine.value = activeEngine;
      if (internetResearchEnabled !== undefined) toggleInternet.checked = Boolean(internetResearchEnabled);

      // Pill display
      const webBadge = toggleInternet.checked ? '🌐 Live Web' : '💾 Local';
      if (geminiConfigured && openaiConfigured) {
        pillDot.style.background = '#10b981';
        pillLabel.textContent = `✨ Gemini + ChatGPT | ${webBadge}`;
        statusBox.style.background = '#ecfdf5';
        statusBox.style.borderColor = '#a7f3d0';
        statusBox.style.color = '#065f46';
        statusText.innerHTML = `<strong>✨ Dual AI Active: Gemini (${geminiModel}) & ChatGPT (${openaiModel})</strong><br/>Routing: <em>${activeEngine.toUpperCase()}</em> • Live Web Grounding: <em>${toggleInternet.checked ? 'Enabled' : 'Disabled'}</em>`;
      } else if (geminiConfigured) {
        pillDot.style.background = '#10b981';
        pillLabel.textContent = `✨ Gemini Flash | ${webBadge}`;
        statusBox.style.background = '#ecfdf5';
        statusBox.style.borderColor = '#a7f3d0';
        statusBox.style.color = '#065f46';
        statusText.innerHTML = `<strong>✨ Google Gemini Active (${geminiModel})</strong><br/>Add an OpenAI API key below for instant dual-model failover • Live Web Grounding: <em>${toggleInternet.checked ? 'Enabled' : 'Disabled'}</em>`;
      } else if (openaiConfigured) {
        pillDot.style.background = '#10b981';
        pillLabel.textContent = `🤖 ChatGPT (${openaiModel}) | ${webBadge}`;
        statusBox.style.background = '#ecfdf5';
        statusBox.style.borderColor = '#a7f3d0';
        statusBox.style.color = '#065f46';
        statusText.innerHTML = `<strong>🤖 OpenAI ChatGPT Active (${openaiModel})</strong><br/>Live Web Grounding: <em>${toggleInternet.checked ? 'Enabled' : 'Disabled'}</em>`;
      } else {
        pillDot.style.background = '#eab308';
        pillLabel.textContent = `⚡ ICAR Resilient Engine | ${webBadge}`;
        statusBox.style.background = '#fefce8';
        statusBox.style.borderColor = '#fef08a';
        statusBox.style.color = '#854d0e';
        statusText.innerHTML = `<strong>⚡ Offline ICAR Pathology Mode Active</strong><br/>Provide either a Gemini or OpenAI API key above to activate live multimodal vision diagnostics.`;
      }
    }

    async function checkStatus() {
      try {
        const res = await fetch('/api/ai/key-status');
        if (res.ok) {
          const data = await res.json();
          updateStatusUI(data);
        }
      } catch (e) {
        console.warn('Could not query AI status:', e);
      }
    }

    checkStatus();

    btn.onclick = () => {
      modal.style.display = 'flex';
      checkStatus();
    };

    document.getElementById('ai-close-modal').onclick = () => { modal.style.display = 'none'; };
    document.getElementById('ai-cancel-btn').onclick = () => { modal.style.display = 'none'; };
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };

    // Live internet research test
    previewInternetBtn.onclick = async () => {
      previewInternetBtn.disabled = true;
      previewInternetBtn.textContent = 'Searching web repositories...';
      previewResult.style.display = 'block';
      previewResult.textContent = 'Fetching Wikipedia & ICAR pathology data...';

      try {
        const res = await fetch('/api/ai/internet-research?crop=Rice&hint=blast');
        const json = await res.json();
        if (json.success) {
          previewResult.innerHTML = `
            <strong>Pathogen:</strong> ${json.data.pathogen}<br/>
            <strong>Verified Symptoms:</strong> ${json.data.verifiedSymptoms}<br/>
            <strong>Live Summary:</strong> ${json.data.onlineWikiSummary}<br/>
            <strong>Citation:</strong> ${json.data.sourceCitation}
          `;
        } else {
          previewResult.textContent = 'Error: ' + json.error;
        }
      } catch (err) {
        previewResult.textContent = 'Fetch failed: ' + err.message;
      } finally {
        previewInternetBtn.disabled = false;
        previewInternetBtn.textContent = '🔍 Test Live Web Data Fetch (Paddy/Blast)';
      }
    };

    // Form submit
    document.getElementById('ai-config-form').onsubmit = async (e) => {
      e.preventDefault();

      const payload = {
        activeEngine: selectEngine.value,
        geminiModel: geminiSelectModel.value,
        openaiModel: openaiSelectModel.value,
        internetResearch: toggleInternet.checked
      };

      const gemVal = geminiInputKey.value.trim();
      if (gemVal) payload.geminiKey = gemVal;

      const oaiVal = openaiInputKey.value.trim();
      if (oaiVal) payload.openaiKey = oaiVal;

      saveBtn.disabled = true;
      saveBtn.textContent = 'Verifying & Saving...';
      msgBox.style.display = 'none';

      try {
        const res = await fetch('/api/ai/configure-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
          msgBox.style.display = 'block';
          msgBox.style.background = '#ecfdf5';
          msgBox.style.color = '#065f46';
          msgBox.textContent = data.message || 'Settings saved successfully!';
          geminiInputKey.value = '';
          openaiInputKey.value = '';
          updateStatusUI(data);

          setTimeout(() => {
            modal.style.display = 'none';
            msgBox.style.display = 'none';
          }, 1500);
        } else {
          msgBox.style.display = 'block';
          msgBox.style.background = '#fee2e2';
          msgBox.style.color = '#991b1b';
          msgBox.textContent = data.error || 'Failed to update settings.';
        }
      } catch (err) {
        msgBox.style.display = 'block';
        msgBox.style.background = '#fee2e2';
        msgBox.style.color = '#991b1b';
        msgBox.textContent = 'Network error: ' + err.message;
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Save & Update AI Configuration';
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
