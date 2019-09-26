function toggle_visibility() {
  $( "#mostrar" ).click(function() {
    $( ".select" ).show( );
  });

  $( "#mostrar1" ).click(function() {
    $( ".select" ).hide( );
  });
}

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}


function completeItem() {


  if (completeSVG){
    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    
    // Add click event for completing the item
    complete.addEventListener('click', completeItem);
    
    //buttons.appendChild(remove);
    buttons.appendChild(complete);    } else {
    text.style.display = "block";

  }

}


