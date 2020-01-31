/**
* send mail to enventnagri support team.
*
* @author Rishu Kumar
*/


$(document).ready(function(){
    $("#contactForm").submit(function(e){
        e.preventDefault();
        $('.r-spin').css('display','inline-block');
        var name = $("#name").val();
        var mob = $("#mob").val();
        var email = $("#email").val();
        var message = $("#message").val();
        if(name.length!=0 && email.length!=0 && mob.length!=0 && message.length!=0)
        {
            $.ajax({
                type: 'POST',
                url: 'https://rishukr06.000webhostapp.com/code/sendgrid/code/index.php',
                data: {
                    'name':name,
                    'mobile':mob,
                    'email':email,
                    'message':message
                },
                cache: false,
                success: function(response)
                {
                    if(response['status']===500)
                    {
                        $('#apiResult').html("<span class='text text-danger'>Sorry! We Unable To Submit Your Request! Please Try Agian In a Moment.<span>")
                        $('#messageButton').click();
                        $('.r-spin').css('display','none');
                    }
                    else if(response['status']===200)
                    {
                        $('#apiResult').html("<span class='text text-success'>Hurray! Your Query Submited! Our Support Team Will Shortly Contact You.<span>")
                        $('#messageButton').click();
                        $('.r-spin').css('display','none');
                        $("#name").val('');
                        $("#mob").val('');
                        $("#email").val('');
                        $("#message").val('');
                    }
                    else{
                        $('#apiResult').html("<span class='text text-danger'>Sorry! Something Went Wrong!<span>")
                        $('#messageButton').click();
                        $('.r-spin').css('display','none'); 
                    } 
                },
                error: function (jqXHR, exception) 
                {
                    var msg = '';
                    if (jqXHR.status === 0) {
                        msg = 'Not connect.\n Verify Network.';
                    } else if (jqXHR.status == 404) {
                        msg = 'Requested page not found. [404]';
                    } else if (jqXHR.status == 500) {
                        msg = 'Internal Server Error [500].';
                    } else if (exception === 'parsererror') {
                        msg = 'Requested parse failed.';
                    } else if (exception === 'timeout') {
                        msg = 'Time out error.';
                    } else if (exception === 'abort') {
                        msg = 'Ajax request aborted.';
                    } else {
                        msg = 'Uncaught Error.\n' + jqXHR.responseText;
                    }
                    //alert(msg);
                    $('.r-spin').css('display','none'); 
                }
            });
        }
        else{
            alert ('****sorry! required field not set *** ')
        }
    
    });
});
