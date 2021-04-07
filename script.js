const handleFormSubmit = event => {
  event.preventDefault();

  const login = document.forms.payment.ik_x_login.value;
  const errorDiv = document.querySelector(".text-error");
  const donateBtn = document.querySelector(".donate-btn");
  donateBtn.setAttribute("disabled", "disabled");
  errorDiv.textContent = "";

  (async () => {
    try {
      const rawResponse = await fetch("https://212.224.112.169:8081/loginCheck", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login }),
      });
      if (rawResponse.status === 200) {
        document.forms.payment.submit();
      } else if (rawResponse.status === 429) {
        errorDiv.textContent = "Произошла ошибка, слишком много запросов, попробуйте позже";
      } else if (rawResponse.status === 203) {
        errorDiv.textContent = "Произошла ошибка, аккаунт не найден";
        donateBtn.removeAttribute("disabled");
      }
    } catch (e) {
      console.error(e)
      donateBtn.removeAttribute("disabled");
      errorDiv.textContent = "Произошла ошибка, попробуйте позже";
    }
  })();
};

const form = document.forms.payment;
// form.addEventListener("submit", handleFormSubmit);


$(function(){
	$('a[href^="#"]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
			bl_top = $(target).offset().top;
		$('body, html').animate({scrollTop: bl_top}, 700);
		return false;
	});
});

 // Мониторинг
$(function(){
    let ip = '46.174.55.235:22005'
  $.getJSON('https://cdn.rage.mp/master/', function(data) {
    $.each(data, function(key, val) {
      {
        if(key === ip){
          var filler = +val.players / +val.maxplayers * 100
          $('.stat-online-nums').text(+val.players + '/' + +val.maxplayers)
          $('.stat-online-bar-fill').css('width', `${filler}%`)
        }
      }
    });
  });
});


$('#donate').click(function(){
  $('#modal').addClass('active')
  $( '#overlay').addClass('active')
  document.forms.payment.ik_pm_no.value = "ID_" + (Math.floor(Math.random() * (99999999 - 100 + 1)) + 100);
})
$('#close,#overlay').click(function(){
  $('#modal').removeClass('active')
  $('#overlay').removeClass('active')
})
$('#menuBtn').click(function(){
  $(this).toggleClass('active')
  if($(this).hasClass('active')){
    $('.menu').addClass('active')
  }
  else{
    $('.menu').removeClass('active')
  }
})
function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}
$( "#in" ).keyup(function() {
    var value = $( this ).val();
    $( "#out" ).val(value * 100);
  }).keyup();

/*//капча
// Работа с виджетом recaptcha
// 1. Получить ответ гугл капчи
var captcha = grecaptcha.getResponse();
 
// 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
// Такую форму не будем отправлять на сервер.
if (!captcha.length) {
  // Выводим сообщение об ошибке
  $('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
} else {
  // получаем элемент, содержащий капчу
  $('#recaptchaError').text('');
}
 
// 3. Если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
if ((formValid) && (captcha.length)) {
  
  // добавить в formData значение 'g-recaptcha-response'=значение_recaptcha
  formData.append('g-recaptcha-response', captcha);
  
}  
  
// 4. Если сервер вернул ответ error, то делаем следующее...
// Сбрасываем виджет reCaptcha
grecaptcha.reset();
// Если существует свойство msg у объекта $data, то...
if ($data.msg) {
  // вывести её в элемент у которого id=recaptchaError
  $('#recaptchaError').text($data.msg);
}*/


var x, i, j, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
