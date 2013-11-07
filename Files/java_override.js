/* Stock file for use as Canvas global javascript file
This file hides: Delete My Account for all users and hides Reset Course Content and Conclude This Course for faculty.
Supplied by SBCTC, with no guarantee as to quality or freshness.
Last update: February, 2013  
*/



$(document).ready(function() {

    var docUrl = document.URL;  // Get the page URL once, for use multiple times  

    // Changes for all users go below this line ----------------------------------------------

    // Alter the user profile page
    if (docUrl.indexOf("about") > 0 || docUrl.indexOf("profile") > 0) {
        $("a:contains('Delete My Account')").hide();
    }
	
	//This changes the login form placeholders on both desktop and mobile login pages.
	//What it does is gets your doman and makes sure that the changes only apply to your login page
	var url = 'https://'
	url += window.location.hostname;
	url += '/login';
	//alert(url);
	//alert(window.location.href);
	if (window.location.href == url ) {
		var sp = $('#login_form label[for=pseudonym_session_unique_id]>span');
		sp.text('');
		//This Changes the Mobile Login Form to show Student or Instructor ID
		document.getElementsByName('pseudonym_session[unique_id]')[0].placeholder='Student or Instructor ID';
	}
	
	if(window.location.pathname.search('enroll'))
    {
		var enrollText = $("p:contains('Please enter your email and password:')");
		enrollText.text('Please enter your Student ID:');
		var enrollSp = $("label.control-label:[for=student_email]contains('Email')");
		enrollSp.text('Student ID');
	}
//This is the JS for altering the footer links on the login page etc.:
//Footer cleanup
                //Remove old
                $("a[href='http://www.instructure.com/privacy-policy']").remove();
                $("a[href='http://www.instructure.com/terms-of-use']").remove();
                $("a[href='http://facebook.com/instructure']").remove();
                $("a[href='http://twitter.com/instructure']").remove();
     
	 //This code changes the text on the 'forgot password' screen

$("#forgot_password_form > p").html("<p>Enter your Student Email Address and we'll send you a link so you can change your password.</p>"); 
$("#forgot_password_form > div > span.field-with-fancyplaceholder > label").html("<span>Student Email Address</span>");	 
     //Add new
     $('#footer-links').append('<a href="http://www.btc.ctc.edu/">Bellingham Technical College</a>');
     $('#footer-links').append('<a href="http://www.facebook.com/bellinghamtech">Facebook</a>');   
    
    //After footer
    $('a#login_forgot_password').text('How do I reset my password?');
    $('.login-options').append('<br/><a id="login_forgot_password" class="show_password_hint" href="#">What is my default password?</a>');  
   // $('div#forgot_password_form').text($(this).attr("data-text"));

$("li.section:contains('Conferences')").hide();

//Script to show password hint.
$(".show_password_hint").click(function() {
$(".loginNote").toggleClass("hidden");
   }); 


     $('<div class="loginNote student-login-help hidden"><div style="width:100%; float:left; margin-top:10px; padding:5%; text-align:left;"><p style="font-size:2em;">Students:</p><p>Your password is the first 6 letters of your last name.</p><p>If it&#39;s less than 6 letters, repeat until you reach 6.</p><p>e.g. Clark Kent&#39;s password is <span style="font-weight:bold;">kentke</span>.</p></div></div>').insertAfter('#modal-box-inner');
    // End of changes for all users ---------------------------------------

    // Loop thru user roles provided by Canvas ENV object    
    var isAdmin = false;
    var isTeacher = false;
    for (var i = ENV.current_user_roles.length - 1; i > -1; i--) {
        switch (ENV.current_user_roles[i]) {
            case 'admin':
                isAdmin = true;

                // Admin-only changes go below this line  -----------------------------

                var rootAccountId = $("#domain_root_account_id").html();
                $("#menu").append("<li id='admincustom_menu_item' class='menu-item'> <a href='/accounts/" + rootAccountId + "' class='menu-item-no-drop'>Admin</a></li>");


                // End of Admin-only changes -------------------------------
                break;
            case 'teacher':
                isTeacher = true;
                if (!isAdmin) {

                    // Teacher-only changes go below this line ----------------------------
                    // Try to change things on a settings page - probably a course settings page 
                    if (docUrl.indexOf("settings") > 0) {
                     	$("a:contains('Permanently Delete this Course')").hide();
                        $("a:contains('Reset Course Content')").hide();
                        $("a:contains('Conclude this Course')").hide();
                    }



                    // End of Teacher-only changes -------------------------
                }
                break;
        }
        if (isTeacher) break;  // Exit the loop early, to avoid checking the remaining roles
    }

    
    if (!isAdmin && !isTeacher) {
        // Student-only ----------------------------------------------------

        // ... student only actions here



        // End of Student-only changes -------------------------------------
    }

	
	// Login page edits
	if (docUrl.indexOf('login') > 0) {        
        //$("label[for='pseudonym_session_unique_id']").html('<span>SID</span>');
    }
	
});

 
    