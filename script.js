document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Interactive Mouse Glow Follower --- */
    const glow1 = document.querySelector('.glow-1');
    if (glow1) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY + window.scrollY;
            glow1.style.left = `${x - 300}px`;
            glow1.style.top = `${y - 300}px`;
        });
    }

    /* --- 2. Typewriter Effect for Hero Title --- */
    const typeTarget = document.querySelector('.hero h1 span');
    const words = ['Developer', 'KPI Student', 'Cybersecurity Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typeTarget.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typeTarget.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }
        setTimeout(typeEffect, typingSpeed);
    }

    if (typeTarget) typeEffect();

    /* --- 3. Active Navigation Link on Scroll --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    /* --- 4. Linux Security Terminal Logic --- */
    const terminalBody = document.getElementById('terminal-body');

    const commands = {
        help: () => `Available commands:
  <span class="highlight">help</span>     - Display this security interface guide
  <span class="highlight">clear</span>    - Clear the terminal screen buffer
  <span class="highlight">neofetch</span> - Show host framework configuration and profile
  <span class="highlight">skills</span>   - List certified system stack competencies
  <span class="highlight">email</span>    - Print target administrator communications point`,
        
        email: () => `Direct administrative channel secure: <a href="mailto:ewgeshka06@gmail.com" class="green-text" style="text-decoration:none; font-weight:bold;">ewgeshka06@gmail.com</a>`,
        
        skills: () => `Certified Technical Skill Sets:
  ---------------------------------
  Python  [████████████████░░░░] 80%
  C++     [██████████░░░░░░░░░░] 50%
  PHP     [████████████░░░░░░░░] 60%
  Linux   [██████████████░░░░░░] 70%
  SecOps  [████████████████░░░░] 80%`,
        
        neofetch: () => `       .---.       guest@ewgeshka06
      /     \\      ----------------
      \\_.._./      OS: Ubuntu Linux x86_64
      _\\  /_       Host: Lenovo Yoga 7
     /  \\'./\\      Kernel: 6.5.0-security-kpi
    (    '  )      Uptime: 2 years, 4 months
     \\_.___/       Shell: bash 5.2.15
                   Target: Cybersecurity Core Specialist`,
        
        clear: () => {
            if (terminalBody) {
                terminalBody.innerHTML = `
                    <div class="terminal-line">Type <span class="highlight">help</span> to view available security commands.</div>
                    <div class="terminal-input-row" id="terminal-input-block">
                        <span class="prompt">guest@ewgeshka06:~$</span>
                        <input type="text" id="terminal-input" autocomplete="off" spellcheck="false">
                    </div>
                `;
                bindTerminalInput();
            }
            return null;
        }
    };

    function handleCommand(e) {
        if (e.key === 'Enter') {
            const inputVal = this.value.trim().toLowerCase();
            const inputBlock = document.getElementById('terminal-input-block');
            
            if (!inputBlock) return;

            const echoLine = document.createElement('div');
            echoLine.className = 'terminal-line';
            echoLine.innerHTML = `<span class="prompt">guest@ewgeshka06:~$</span> ${this.value}`;
            terminalBody.insertBefore(echoLine, inputBlock);

            if (inputVal === 'clear') {
                commands.clear();
                return;
            }

            if (inputVal) {
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line';
                
                if (commands[inputVal]) {
                    const result = commands[inputVal]();
                    if (result !== null) {
                        outputLine.innerHTML = result;
                        terminalBody.insertBefore(outputLine, inputBlock);
                    }
                } else {
                    outputLine.innerHTML = `bash: command not found: ${inputVal}. Type <span class="highlight">help</span> for options.`;
                    terminalBody.insertBefore(outputLine, inputBlock);
                }
            }

            this.value = '';
            if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }

    function bindTerminalInput() {
        const terminalInput = document.getElementById('terminal-input');
        if (terminalInput) {
            terminalInput.addEventListener('keydown', handleCommand);
            terminalInput.focus();
        }
    }

    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            const input = document.getElementById('terminal-input');
            if (input) input.focus();
        });
    }

    bindTerminalInput();
});