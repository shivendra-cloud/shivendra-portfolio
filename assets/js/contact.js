/* Contact form (Web3Forms), resume link and footer social links.
   Replace WEB3FORMS_ACCESS_KEY once you have the key. */
(function () {
  var ACCESS_KEY = 'WEB3FORMS_ACCESS_KEY';
  var ENDPOINT = 'https://api.web3forms.com/submit';
  var EMAIL = 'shivendraxshukla@gmail.com';
  var RESUME = 'assets/Shivendra_Shukla_Resume.pdf';
  var LINKS = [
    { label: 'GitHub', href: 'https://github.com/shivendra-cloud' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shivendra-shukla-bb5185392' },
    { label: 'Email', href: 'mailto:' + EMAIL }
  ];

  function el(tag, text, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function validate(d) {
    var errs = {};
    if (!d.name) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errs.email = 'Please enter a valid email address.';
    if (d.message.length < 10) errs.message = 'Please write at least 10 characters.';
    return errs;
  }

  function labelled(id, text, input) {
    var label = el('label');
    label.setAttribute('for', id);
    label.appendChild(document.createTextNode(text));
    input.id = id;
    input.name = id;
    var err = el('p', '', 'field-error');
    err.id = id + '-error';
    err.hidden = true;
    input.setAttribute('aria-describedby', err.id);
    label.appendChild(input);
    label.appendChild(err);
    return { label: label, err: err, input: input };
  }

  function buildForm(section) {
    var form = el('form', null, 'contact-form');
    form.setAttribute('novalidate', '');
    form.id = 'contact-form';

    var nameInput = el('input');
    nameInput.type = 'text';
    nameInput.autocomplete = 'name';
    var emailInput = el('input');
    emailInput.type = 'email';
    emailInput.autocomplete = 'email';
    var msgInput = el('textarea');
    msgInput.rows = 5;

    var fName = labelled('name', 'Name', nameInput);
    var fEmail = labelled('email', 'Email', emailInput);
    var fMsg = labelled('message', 'Message', msgInput);

    // Honeypot: real visitors never fill this in
    var hp = el('div', null, 'hp-field');
    hp.setAttribute('aria-hidden', 'true');
    var bot = el('input');
    bot.type = 'text';
    bot.name = 'website';
    bot.tabIndex = -1;
    bot.autocomplete = 'off';
    hp.appendChild(bot);

    var status = el('p', '', 'form-status');
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');

    var submit = el('button', 'Send message', 'btn');
    submit.type = 'submit';

    form.appendChild(fName.label);
    form.appendChild(fEmail.label);
    form.appendChild(fMsg.label);
    form.appendChild(hp);
    form.appendChild(submit);
    form.appendChild(status);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.textContent = '';
      var data = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: msgInput.value.trim()
      };
      var errors = validate(data);
      [[fName, 'name'], [fEmail, 'email'], [fMsg, 'message']].forEach(function (pair) {
        var f = pair[0];
        var msg = errors[pair[1]] || '';
        f.err.textContent = msg;
        f.err.hidden = !msg;
        f.input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      });
      if (Object.keys(errors).length) {
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      // Bot filled the honeypot: pretend success, send nothing
      if (bot.value) {
        status.textContent = 'Thanks, your message has been sent.';
        form.reset();
        return;
      }

      if (ACCESS_KEY === 'WEB3FORMS_ACCESS_KEY') {
        status.textContent = 'The contact form is not set up yet. Please email ' + EMAIL + ' directly.';
        return;
      }

      submit.disabled = true;
      status.textContent = 'Sending…';
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: 'Portfolio message from ' + data.name,
          name: data.name,
          email: data.email,
          message: data.message
        })
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            return r.ok && j.success;
          });
        })
        .then(function (ok) {
          if (!ok) throw new Error('send failed');
          status.textContent = 'Thanks, your message has been sent.';
          form.reset();
        })
        .catch(function () {
          status.textContent = 'Sorry, the message could not be sent. Please try again or email ' + EMAIL + '.';
        })
        .then(function () {
          submit.disabled = false;
        });
    });

    section.appendChild(form);
  }

  function buildContact() {
    var section = document.getElementById('contact');
    if (!section || document.getElementById('contact-form')) return;
    buildForm(section);
    var resume = el('a', 'Download my resume (PDF)', 'resume-link');
    resume.href = RESUME;
    resume.setAttribute('download', '');
    section.appendChild(resume);
  }

  function buildFooter() {
    var footer = document.querySelector('footer');
    if (!footer || footer.querySelector('.social-links')) return;
    var ul = el('ul', null, 'social-links');
    ul.setAttribute('aria-label', 'Social links');
    LINKS.forEach(function (l) {
      var li = el('li');
      var a = el('a', l.label);
      a.href = l.href;
      if (l.href.indexOf('http') === 0) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      li.appendChild(a);
      ul.appendChild(li);
    });
    footer.appendChild(ul);
  }

  function init() {
    buildContact();
    buildFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
