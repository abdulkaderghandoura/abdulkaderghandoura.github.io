window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-KCD21Z4217');

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('summary').style.display = 'block';
    document.querySelector('.tab[data-section="summary"]').classList.add('active');
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('main section');
    sections.forEach(function (section) {
        section.style.display = 'none';
    });

    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('.tab').forEach(function (tab) {
        tab.classList.remove('active');
    });
    document.querySelector('.tab[data-section="' + sectionId + '"]').classList.add('active');
}

