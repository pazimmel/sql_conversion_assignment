$(document).ready(function(){
   $("#search").submit(getData);

   $("#addSomeone").submit(addSomeone);

    $("#peopleContainer").on('click', '.delete', deletePerson);

   getData();
});

function getData(values){
    //console.log(values);
    event.preventDefault();
    var values = {};

    $.each($(this).serializeArray(), function(i, field){
        values[field.name] = field.value;
    });
    //console.log(values);
   $.ajax({
      type: "GET",
      url: "/data",
      data: values,
      success: function(data){
         //console.log(data);
         updateDOM(data);
      }
   })
}

function addSomeone(){
   event.preventDefault();
   var values = {};

   $.each($(this).serializeArray(), function(i, field){
      values[field.name] = field.value;
   });

   $("#addSomeone").find("input[type=text]").val("");
   //console.log(values);
   $.ajax({
      type: "POST",
      url: "/data",
      data: values,
      success: function(data){
         getData();
      }
   });
}

function deletePerson(){
   var deletedId = {"id" : $(this).data("id")};

   console.log("Meaningful Log: ", deletedId);

   $.ajax({
      type: "DELETE",
      url: "/data",
      data: deletedId,
      success: function(data){
         console.log(data);
         getData();
      }
   })
}

function updateDOM(data){
   $("#peopleContainer").empty();

   for(var i = 0; i < data.length; i++){
      var el = "<div class='well person col-md-3'>" +
                  "<p>" + data[i].name + "</p>" +
                  "<p>" + data[i].location + "</p>" +
                  "<p>" + data[i].spirit_animal + "</p>" +
                  "<p>" + data[i].address + "</p>" +
                  "<button class='delete btn btn-danger' data-id='" +
                     data[i].id + "'>Delete</button>" +
               "</div>";

      $("#peopleContainer").append(el);
   }
}
