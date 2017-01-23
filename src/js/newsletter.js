var Newsletter = {
  subscribe: function(formSelector) {
    var form = document.querySelector(formSelector);
    var control = form.elements['email_address'];
    var email_address = control.value;
    var xhr;

    if (!control.value) {
      control.focus();
      return;
    }

    control.disabled = true;

    xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      control.disabled = false;

      // Ops
      if (xhr.status != 200) {
        alert('Oops, something went wrong');
      }

      // Success
      if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);

        if (json.status) {
          alert('Thanks for subscribing to our newsletter');
        }
        else {
          alert(json.error);
        }
      }
    };

    xhr.send(JSON.stringify({email_address: email_address}));

    return;
  }
}
