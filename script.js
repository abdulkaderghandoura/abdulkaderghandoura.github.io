// Google Analytics 4
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KCD21Z4217');

(function () {
    var root = document.documentElement;
    var status = document.getElementById('status');

    // Links open in a new tab, as on the thesis page. In-page anchors and email links are left as they are;
    // pages marked data-new-tab="external" (the privacy page) keep their links back to this site in the same tab.
    var externalOnly = document.body.dataset.newTab === 'external';
    document.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (href.charAt(0) === '#' || href.indexOf('mailto:') === 0) return;
        if (externalOnly && a.host === location.host) return;
        a.target = '_blank';
        a.relList.add('noopener');
    });

    function copy(text, btn) {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(function () {
            btn.textContent = 'Copied';
            if (status) status.textContent = 'Copied to clipboard';
            setTimeout(function () {
                btn.textContent = 'Copy';
                if (status) status.textContent = '';
            }, 1500);
        });
    }

    // Theme: System (default, follows the OS), Light or Dark. Only an explicit choice is saved.
    document.querySelectorAll('input[name="theme"]').forEach(function (r) {
        r.checked = r.value === (root.dataset.theme || 'system');
        r.addEventListener('change', function () {
            if (r.value === 'system') delete root.dataset.theme; else root.dataset.theme = r.value;
            try {
                if (r.value === 'system') localStorage.removeItem('theme'); else localStorage.setItem('theme', r.value);
            } catch (e) {}
        });
    });

    // Email: the page stores only ROT13-scrambled pieces; the address is assembled after a click
    var toggle = document.querySelector('.email-toggle');
    var panel = document.getElementById('email-panel');
    function rot13(s) {
        return s.replace(/[a-z]/gi, function (c) {
            var base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode((c.charCodeAt(0) - base + 13) % 26 + base);
        });
    }
    if (toggle && panel) {
        toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', String(open));
            if (open && !panel.firstChild) {
                var parts = rot13(panel.dataset.e).split('|');
                var addr = parts[0] + '@' + parts[1];
                var box = document.createElement('span');
                box.className = 'email-box';
                var a = document.createElement('a');
                a.href = 'mailto:' + addr;
                a.textContent = addr;
                box.appendChild(a);
                if (navigator.clipboard) {
                    var b = document.createElement('button');
                    b.type = 'button';
                    b.className = 'btn-small';
                    b.textContent = 'Copy';
                    b.addEventListener('click', function () { copy(addr, b); });
                    box.appendChild(b);
                }
                panel.appendChild(box);
            }
            panel.hidden = !open;
        });
    }

    // BibTeX blocks
    document.querySelectorAll('.bib-toggle').forEach(function (btn) {
        var box = document.getElementById(btn.getAttribute('aria-controls'));
        btn.addEventListener('click', function () {
            var open = btn.getAttribute('aria-expanded') !== 'true';
            btn.setAttribute('aria-expanded', String(open));
            box.classList.toggle('open', open);
        });
        var copyBtn = box.querySelector('.copy');
        if (!navigator.clipboard) copyBtn.hidden = true;
        copyBtn.addEventListener('click', function () {
            copy(box.querySelector('code').textContent, copyBtn);
        });
    });

    // News: the button stays at the end of the list
    var list = document.getElementById('news-list');
    var more = document.getElementById('news-more');
    if (list && more) {
        more.addEventListener('click', function () {
            var open = !list.classList.contains('expanded');
            list.classList.toggle('expanded', open);
            more.setAttribute('aria-expanded', String(open));
            more.firstElementChild.textContent = open ? 'Show less' : 'Show more';
            if (!open) more.scrollIntoView({ block: 'nearest' });
        });
    }
})();
