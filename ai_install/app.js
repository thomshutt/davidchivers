const state = {
  os: null,
  tool: null,
  editor: null,
  pack: null,
  current: 0,
  steps: []
};

const distribution = {
  github: {
    owner: 'davidchivers',
    repo: 'ai_install',
    branchBasic: 'starter_basic',
    branchAdvanced: 'starter_advanced'
  },
  oneDriveFolderUrlBasic: '',
  oneDriveFolderUrlAdvanced: '',
  vscodeProfileUrl: '',
  cursorProfileUrl: 'cursor://profile/github/0cf6696b0aa251846a9b1ed761267f88',
  teachingSlidesUrl: 'https://1drv.ms/p/c/34def9d130aed1a9/IQBwHWaK-I16T7yC88Wf80p5AdKUKL3gW8454f3iwOOWwCk?e=lDNPKN'
};

const nav = document.getElementById('stepNav');
const content = document.getElementById('stepContent');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');

function osLabel(os) {
  return os === 'windows' ? 'Windows' : os === 'mac' ? 'Mac' : 'Not selected';
}

function toolLabel(tool) {
  if (tool === 'codex') return 'Codex';
  if (tool === 'claude') return 'Claude Code';
  if (tool === 'both') return 'Codex + Claude Code';
  return 'Not selected';
}

function editorLabel(editor) {
  if (editor === 'vscode') return 'VS Code';
  if (editor === 'cursor') return 'Cursor';
  return 'Not selected';
}

function packLabel(pack) {
  if (pack === 'basic') return 'Basic starter';
  if (pack === 'advanced') return 'Advanced starter';
  return 'Not selected';
}

function learnBlock(title, body) {
  return `<details class="learn"><summary>${title}</summary>${body}</details>`;
}

function githubZipUrlForPack(pack) {
  const { owner, repo, branchBasic, branchAdvanced } = distribution.github;
  if (!owner || !repo || owner.startsWith('YOUR_') || repo.startsWith('YOUR_')) return null;
  if (pack === 'basic' && branchBasic) {
    return `https://github.com/${owner}/${repo}/archive/refs/heads/${branchBasic}.zip`;
  }
  if (pack === 'advanced' && branchAdvanced) {
    return `https://github.com/${owner}/${repo}/archive/refs/heads/${branchAdvanced}.zip`;
  }
  return null;
}

function hasConfiguredUrl(url) {
  return Boolean(url) && !url.startsWith('YOUR_');
}

function chooseOsStep() {
  const hasSlides = hasConfiguredUrl(distribution.teachingSlidesUrl);
  const slidesLink = hasSlides
    ? `<p><a href="${distribution.teachingSlidesUrl}" target="_blank">Open powerpoint slides for Agentic Coding Introduction</a></p>`
    : '';

  return {
    id: 'choose-os',
    title: 'Choose OS',
    html: `
      <h2>Page 1: Choose your computer type</h2>
      <p>Pick one to start your setup path.</p>
      <div class="callout callout--warn">This installation is for personal computers or computers where you have administrator install rights.</div>
      <div class="choice-grid">
        <button class="btn choice" data-os="windows">Windows</button>
        <button class="btn choice" data-os="mac">Mac</button>
      </div>
      <p class="small">Current selection: <strong>${osLabel(state.os)}</strong></p>
      ${learnBlock('Learn more', '<p>This wizard combines quick actions with optional explanation. You can expand only what you need.</p>')}
      ${slidesLink}
    `,
    onRender: () => {
      document.querySelectorAll('[data-os]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.os = btn.dataset.os;
          buildSteps();
          state.current = state.steps.findIndex(s => s.id === 'choose-tool');
          render();
        });
      });
    }
  };
}

function chooseToolStep() {
  return {
    id: 'choose-tool',
    title: 'Choose AI Agent',
    html: `
      <h2>Page 2: Choose your AI agent</h2>
      <p>Next, install one AI agent: Codex, Claude Code, or both.</p>
      <p><strong>Paid accounts needed:</strong> <a href="https://chatgpt.com/" target="_blank">ChatGPT (OpenAI)</a> and/or <a href="https://claude.ai/" target="_blank">Claude (Anthropic)</a>, depending on whether you install Codex and/or Claude Code.</p>
      <div class="choice-grid">
        <button class="btn choice" data-tool="codex">Codex only</button>
        <button class="btn choice" data-tool="claude">Claude only</button>
        <button class="btn choice" data-tool="both">Both</button>
      </div>
      <p class="small">Current selection: <strong>${toolLabel(state.tool)}</strong></p>
    `,
    onRender: () => {
      document.querySelectorAll('[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.tool = btn.dataset.tool;
          buildSteps();
          state.current = state.steps.findIndex(s => s.id === 'choose-editor');
          render();
        });
      });
    }
  };
}

function chooseEditorStep() {
  const isMac = state.os === 'mac';
  const platformLabel = isMac ? 'Mac' : 'Windows';
  const vscodeInstructions = isMac
    ? '<ol><li>Download the macOS version.</li><li>Open the download.</li><li>Move VS Code to Applications.</li><li>Open VS Code.</li></ol>'
    : '<ol><li>Download the Windows installer.</li><li>Run with default options.</li><li>Open VS Code.</li></ol>';
  const cursorInstructions = isMac
    ? '<ol><li>Download Cursor for macOS.</li><li>Open the download.</li><li>Move Cursor to Applications.</li><li>Open Cursor.</li></ol>'
    : '<ol><li>Download Cursor for Windows.</li><li>Run with default options.</li><li>Open Cursor.</li></ol>';
  const chosenEditorInstall =
    state.editor === 'vscode'
      ? vscodeInstructions
      : state.editor === 'cursor'
        ? cursorInstructions
        : '';

  return {
    id: 'choose-editor',
    title: 'Install Editor',
    html: `
      <h2>Page 3: Download VS Code or Cursor (${platformLabel})</h2>
      <p>Choose one editor before continuing.</p>
      <div class="choice-grid">
        <button class="btn choice" data-editor="vscode">VS Code</button>
        <button class="btn choice" data-editor="cursor">Cursor</button>
      </div>
      <p class="small">Current selection: <strong>${editorLabel(state.editor)}</strong></p>
      <p><strong>Download links:</strong> <a href="https://code.visualstudio.com/Download" target="_blank">VS Code</a> or <a href="https://www.cursor.com/downloads" target="_blank">Cursor</a>.</p>
      ${chosenEditorInstall}
    `,
    onRender: () => {
      document.querySelectorAll('[data-editor]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.editor = btn.dataset.editor;
          // Beginner flow: selecting an editor immediately continues to the next step.
          buildSteps();
          state.current = state.steps.findIndex(s => s.id === 'install-git');
          render();
        });
      });
    }
  };
}

function gitStep() {
  const editor = editorLabel(state.editor);

  if (state.os === 'mac') {
    return {
      id: 'install-git',
      title: 'Install Git',
      html: `
        <h2>Page 4: Install Git (Mac)</h2>
        <p>Git tracks file changes in your project.</p>
        <div class="code">xcode-select --install</div>
        <p>Alternative: <a href="https://git-scm.com/download/mac" target="_blank">https://git-scm.com/download/mac</a></p>
        <p>In ${editor}, open <strong>Terminal -> New Terminal</strong>, then run:</p>
        <div class="code">git --version</div>
      `
    };
  }

  return {
    id: 'install-git',
    title: 'Install Git',
    html: `
      <h2>Page 4: Install Git (Windows)</h2>
      <p>Git tracks file changes in your project.</p>
      <p>Install from: <a href="https://git-scm.com/download/win" target="_blank">https://git-scm.com/download/win</a></p>
      <p>In ${editor}, open <strong>Terminal -> New Terminal</strong>, then run:</p>
      <div class="code">git --version</div>
    `
  };
}

function nodeStep() {
  const editor = editorLabel(state.editor);

  return {
    id: 'install-node',
    title: 'Install Node.js',
    html: `
      <h2>Page 5: Install Node.js LTS (${osLabel(state.os)})</h2>
      <p>Download from: <a href="https://nodejs.org/" target="_blank">https://nodejs.org/</a></p>
      <ol>
        <li>Install the LTS version.</li>
        <li>In ${editor}, open <strong>Terminal -> New Terminal</strong>.</li>
        <li>Run:</li>
      </ol>
      <div class="code">node -v\nnpm -v</div>
    `
  };
}

function installAgentStep() {
  const editor = editorLabel(state.editor);
  let commands = '';

  if (state.tool === 'codex') {
    commands = `<div class="code">npm install -g @openai/codex\ncodex --login\ncodex</div>`;
  } else if (state.tool === 'claude') {
    commands = `<div class="code">npm install -g @anthropic-ai/claude-code\nclaude</div>`;
  } else {
    commands = `<div class="code">npm install -g @openai/codex\ncodex --login\ncodex\n\nnpm install -g @anthropic-ai/claude-code\nclaude</div>`;
  }

  return {
    id: 'install-agent',
    title: 'Install AI Agent',
    html: `
      <h2>Page 6: Install ${toolLabel(state.tool)}</h2>
      <p>Paste these commands into the <strong>${editor} terminal</strong> (Terminal -> New Terminal).</p>
      ${commands}
    `
  };
}

function templateStep() {
  const editor = editorLabel(state.editor);
  const selectedPack = state.pack;
  const selectedZipUrl = selectedPack ? githubZipUrlForPack(selectedPack) : null;
  const selectedOneDriveUrl = selectedPack === 'basic'
    ? distribution.oneDriveFolderUrlBasic
    : selectedPack === 'advanced'
      ? distribution.oneDriveFolderUrlAdvanced
      : '';
  const hasOneDrive = hasConfiguredUrl(selectedOneDriveUrl);

  const selectedDescription = selectedPack === 'basic'
    ? '<p><strong>Basic starter:</strong> simpler setup for first-time users with core files only.</p>'
    : selectedPack === 'advanced'
      ? '<p><strong>Advanced starter:</strong> full setup with preferences, structured notes, and additional standards.</p>'
      : '<p class="small">Choose Basic or Advanced first.</p>';

  const selectedExamples = selectedPack === 'basic'
    ? `
      <ul>
        <li><code>agents/empirical-idea-generator.md</code></li>
        <li><code>skills/stata-regression-SKILL.md</code></li>
        <li><code>projects/_project_template/notes/brainstorm.md</code></li>
        <li><code>projects/_project_template/notes/research_plan.md</code></li>
      </ul>
    `
      : selectedPack === 'advanced'
      ? `
        <ul>
          <li><code>memory/global_notes.md</code></li>
          <li><code>projects/_project_template/notes/01_project_overview.md</code></li>
          <li><code>projects/_project_template/notes/05_research_plan.md</code></li>
          <li><code>standards/notes_phase_standard.md</code></li>
        </ul>
      `
      : '<p class="small">Select a pack to preview example files.</p>';

  const zipBlock = selectedZipUrl
    ? `<p><a href="${selectedZipUrl}" target="_blank">Download ${packLabel(selectedPack)} ZIP</a></p>`
    : selectedPack
      ? '<p><strong>ZIP link not configured for this pack.</strong></p>'
      : '';

  const oneDriveBlock = hasOneDrive
    ? `<p><a href="${selectedOneDriveUrl}" target="_blank">Open ${packLabel(selectedPack)} on OneDrive</a></p>`
    : '';

  return {
    id: 'template',
    title: 'Choose Starter Pack',
    html: `
      <h2>Page 7: Choose your starter pack</h2>
      <p>Pick one pack, then download it.</p>
      <div class="choice-grid">
        <button class="btn choice" data-pack="basic">Basic starter</button>
        <button class="btn choice" data-pack="advanced">Advanced starter</button>
      </div>
      <p class="small">Current selection: <strong>${packLabel(selectedPack)}</strong></p>
      ${selectedDescription}
      ${zipBlock}
      ${oneDriveBlock}
      <p><strong>Example files in selected pack:</strong></p>
      ${selectedExamples}
      <ol>
        <li>Download/extract your selected pack.</li>
        <li>In ${editor}: <strong>File -> Open Folder</strong>.</li>
        <li>Select the extracted starter folder.</li>
      </ol>
    `,
    onRender: () => {
      document.querySelectorAll('[data-pack]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.pack = btn.dataset.pack;
          render();
        });
      });
    }
  };
}

function profileStep() {
  const editor = editorLabel(state.editor);
  const editorName = state.editor ? editor : 'your editor';
  const shortcut = state.os === 'mac'
    ? '<strong>Cmd + Shift + P</strong> on Mac'
    : '<strong>Ctrl + Shift + P</strong> on Windows';
  const isCursor = state.editor === 'cursor';
  const selectedProfileUrl = isCursor ? distribution.cursorProfileUrl : distribution.vscodeProfileUrl;
  const hasProfileUrl = hasConfiguredUrl(selectedProfileUrl);
  const profileLink = hasProfileUrl
    ? `<p><a href="${selectedProfileUrl}">Download ${editorName} profile</a></p>`
    : `<p><strong>Missing:</strong> ${editorName} profile link is not configured. Set <code>distribution.${isCursor ? 'cursorProfileUrl' : 'vscodeProfileUrl'}</code> in <code>app.js</code>.</p>`;

  return {
    id: 'profile',
    title: 'Download Profile',
    html: `
      <h2>Page 8: Download ${editorName} profile (optional)</h2>
      <p>This step is optional. Use it to quickly load the same settings as the workshop.</p>
      ${profileLink}
      <ol>
        <li>Open ${editorName}.</li>
        <li>Press ${shortcut}.</li>
        <li>Run <strong>Profiles: Import Profile</strong>.</li>
        <li>Paste the downloaded profile link and complete the import.</li>
      </ol>
      <p class="small">You can skip this step and continue. Your setup will still work.</p>
    `
  };
}

function githubStep() {
  return {
    id: 'github',
    title: 'Pair with GitHub',
    html: `
      <h2>Page 9: Pair with GitHub (beginner backup)</h2>
      <p>GitHub is a free backup for your project files and gives you version history.</p>
      <p>If you are new, ask Claude or Codex to guide you step-by-step.</p>
      <p><a href="https://github.com/" target="_blank">Create or sign in to GitHub</a></p>
      <p><strong>Try pasting this into Claude/Codex chat:</strong></p>
      <div class="code">I want to back up and pair my folders with Git. I am a beginner. Please explain each step, why it matters, and give me the exact commands for my computer.</div>
      <p><strong>If you want direct commands:</strong></p>
      <div class="code">git init\ngit add .\ngit commit -m "Initial backup"\ngit branch -M main\ngit remote add origin https://github.com/YOUR_USER/YOUR_REPO.git\ngit push -u origin main</div>
    `
  };
}

function appendixStep() {
  return {
    id: 'appendix',
    title: 'Glossary',
    html: `
      <h2>Page 10: Quick glossary</h2>
      <ul>
        <li><strong>IDE:</strong> The app where you edit code (for example VS Code or Cursor).</li>
        <li><strong>Terminal:</strong> Text window where you run commands.</li>
        <li><strong>CLI:</strong> Command-line tool you run in the terminal.</li>
        <li><strong>Git:</strong> Version control system that tracks changes.</li>
        <li><strong>GitHub:</strong> Website for hosting Git repositories.</li>
        <li><strong>Repository (repo):</strong> Project folder tracked by Git.</li>
        <li><strong>Branch:</strong> Separate line of development in a repo.</li>
        <li><strong>Commit:</strong> Saved checkpoint of changes in Git.</li>
        <li><strong>ZIP:</strong> Compressed folder download.</li>
        <li><strong>Profile:</strong> Bundle of editor settings and extensions.</li>
      </ul>
    `
  };
}

function doneStep() {
  return {
    id: 'done',
    title: 'Done',
    html: `<h2>Setup complete</h2><p>You finished the <strong>${osLabel(state.os)}</strong> path with <strong>${toolLabel(state.tool)}</strong> in <strong>${editorLabel(state.editor)}</strong>.</p>`
  };
}

function buildSteps() {
  state.steps = [
    chooseOsStep(),
    chooseToolStep(),
    chooseEditorStep(),
    gitStep(),
    nodeStep(),
    installAgentStep(),
    templateStep(),
    profileStep(),
    githubStep(),
    appendixStep(),
    doneStep()
  ];
}

function renderNav() {
  nav.innerHTML = '';
  const step = state.steps[state.current];
  const li = document.createElement('li');
  li.className = 'step-nav__item active';
  li.textContent = `Step ${state.current + 1} of ${state.steps.length}: ${step.title}`;
  nav.appendChild(li);
}

function render() {
  const step = state.steps[state.current];
  content.innerHTML = step.html;
  if (typeof step.onRender === 'function') step.onRender();

  backBtn.disabled = state.current === 0;
  nextBtn.textContent = state.current === state.steps.length - 1 ? 'Finish' : 'Next';
  progressBar.style.width = `${Math.round((state.current / (state.steps.length - 1)) * 100)}%`;
  renderNav();
}

backBtn.addEventListener('click', () => {
  if (state.current > 0) {
    state.current -= 1;
    render();
  }
});

nextBtn.addEventListener('click', () => {
  const step = state.steps[state.current];
  if (step.id === 'choose-os' && !state.os) {
    alert('Select Windows or Mac first.');
    return;
  }
  if (step.id === 'choose-tool' && !state.tool) {
    alert('Select Codex, Claude, or Both first.');
    return;
  }
  if (step.id === 'choose-editor' && !state.editor) {
    alert('Select VS Code or Cursor first.');
    return;
  }
  if (step.id === 'template' && !state.pack) {
    alert('Select Basic or Advanced first.');
    return;
  }
  if (state.current < state.steps.length - 1) {
    state.current += 1;
    render();
  }
});

buildSteps();
render();
