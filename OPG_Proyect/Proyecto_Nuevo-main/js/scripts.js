function active(i){
  actives = document.getElementsByClassName('active');
  actives[0].classList.remove("text-danger");
  actives[0].classList.add("text-warning");
  actives[0].classList.remove("active");
  document.getElementById('menu').children[i].children[0].classList.add('active');
  document.getElementById('menu').children[i].children[0].classList.remove('text-warning');
  document.getElementById('menu').children[i].children[0].classList.add('text-danger');
}
