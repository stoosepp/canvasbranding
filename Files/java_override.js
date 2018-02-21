/* Stock file for use as Canvas global javascript file
This file hides: Delete My Account for all users and hides Reset Course Content and Conclude This Course for faculty.
Supplied by SBCTC, with no guarantee as to quality or freshness.
Last update: February, 2013  
*/

//Canvabadges stuff

$(function() {
  // NOTE: if pasting this code into another script, you'll need to manually change the
  // next line. Instead of assigning the value null, you need to assign the value of
  // the Canvabadges domain, i.e. "https://www.canvabadges.org". If you have a custom
  // domain configured then it'll be something like "https://www.canvabadges.org/_my_site"
  // instead.
  var protocol_and_host = "https://www.canvabadges.org";
  if(!protocol_and_host) {
    var $scripts = $("script");
    $("script").each(function() {
      var src = $(this).attr('src');
      if(src && src.match(/canvas_profile_badges/)) {
        var splits = src.split(/\//);
        protocol_and_host = splits[0] + "//" + splits[2];
      }
      var prefix = src && src.match(/\?path_prefix=\/(\w+)/);
      if(prefix && prefix[1]) {
        protocol_and_host = protocol_and_host + "/" + prefix[1];
      }
    });
  }
  if(!protocol_and_host) {
    console.log("CANVABADGES: Couldn't find a valid protocol and host. Canvabadges will not appear on profile pages until this is fixed.");
  }
  var match = location.href.match(/\/(users|about)\/(\d+)$/);
  if(match && protocol_and_host) {
    var user_id = match[2];
    var domain = location.host;
    var url = protocol_and_host + "/api/v1/badges/public/" + user_id + "/" + encodeURIComponent(domain) + ".json";
    $.ajax({
      type: 'GET',
      dataType: 'jsonp',
      url: url,
      success: function(data) {
        if(data.objects && data.objects.length > 0) {
          var $box = $("<div/>", {style: 'margin-bottom: 20px;'});
          $box.append("<h2 class='border border-b'>Badges Awarded</h2>");
          for(idx in data.objects) {
            var badge = data.objects[idx];
            var $badge = $("<div/>", {style: 'float: left;'});
            var link = protocol_and_host + "/badges/criteria/" + badge.config_id + "/" + badge.config_nonce + "?user=" + badge.nonce;
            var $a = $("<a/>", {href: link});
            $a.append($("<img/>", {src: badge.image_url, style: 'width: 90px; height: 90px; padding-right: 10px;'}));
            $badge.append($a);
            $box.append($badge);
          }
          $box.append($("<div/>", {style: 'clear: left'}));
          $("#edit_profile_form,fieldset#courses,.more_user_information + div").after($box);
        } else {
          console.log("CANVABADGES: no badges found for the user: " + user_id + " at " + domain);
        }
      },
      error: function() {
        console.log("CANVABADGES: badges failed to load, API error response");
      },
      timeout: 5000
    });
  }
});


  
$(document).ready(function() {


// --- Google Analytics code ---
/*
var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-XXXXXXXXX']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  */
  

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXX', 'auto');
  ga('send', 'pageview');


 

  // ---- End Google Analytics ----


    var docUrl = document.URL;  // Get the page URL once, for use multiple times  

    // Changes for all users go below this line ----------------------------------------------

    // Alter the user profile page
    if (docUrl.indexOf("about") > 0 || docUrl.indexOf("profile") > 0) {
        $("a:contains('Delete My Account')").hide();
    }
	
                // Login form updates - runs only on login page                                
                if (document.URL.indexOf("/login")>0) {
                
                                // Username and passwords prompts
                                //    Mobile only has placeholder value set on element: name="pseudonym_session[unique_id]" value="SID"
                                //    Desktop has instead: label for="pseudonym_session_unique_id" containing: <span>SID</span>
                                // Test for desktop by looking for label 
                                if ($("label[for='pseudonym_session_unique_id']").length) {
									/*if (navigator.userAgent.match(/Firefox/)) {
									//Firefox
									//	alert('You are using Firefox')
										$("label[for='pseudonym_session_unique_id']").html('<span style="width:200px;">Student or Instructor ID<span>');  // Username prompt
										$("label[for='pseudonym_session_password']").html('<span style="width:200px;">PW: 1st 6 of last name<span>'); // Password prompt  
										$("label[for='pseudonym_session_unique_id_forgot']").html('<span style="width:200px;">BTC Email Address<span>');
									}
									if(navigator.userAgent.match(/MSIE/)){
									//IE
									//alert('You are using IE')
                                    $("label[for='pseudonym_session_unique_id']").html('Student or Instructor ID');  // Username prompt
                                    $("label[for='pseudonym_session_password']").html('PW: 1st 6 of last name'); // Password prompt  
									$("label[for='pseudonym_session_unique_id_forgot']").html('BTC Email Address');
									}
									if (navigator.userAgent.match(/Chrome/)){
									//Chrome
									//alert('You are using Chrome')
                                    $("label[for='pseudonym_session_unique_id']").html('Student or Instructor ID');  // Username prompt
                                    $("label[for='pseudonym_session_password']").html('PW: 1st 6 of last name'); // Password prompt  
									$("label[for='pseudonym_session_unique_id_forgot']").html('BTC Email Address');
									} */
									//Generic
									$("label[for='pseudonym_session_unique_id']").html('Student or Instructor ID'); // Username prompt
									$("label[for='pseudonym_session_password']").html('PW: 1st 6 of last name'); // Password prompt                        
									$("label[for='pseudonym_session_unique_id_forgot']").html('BTC Email Address');
								}
                                else {
                                    // Mobile
                                    document.getElementsByName('pseudonym_session[unique_id]')[0].placeholder='Student or Instructor ID';               // username prompt
                                    document.getElementsByName('pseudonym_session[password]')[0].placeholder='PW: 1st 6 of last name';  // password prompt                            
									document.getElementsByName('pseudonym_session[unique_id_forgot]')[0].placeholder='BTC Email Address';
							   }                                                                             
                                
                                                
                                
                } // End of logon form updates - any logon form script must be above this line.

	
//This is the JS for altering the footer links on the login page etc.:
//Footer cleanup
                // Example below removes the default Canvas footer items
    $("a[href='http://www.instructure.com/images/footer-logo.png']").remove();
    $("a[href='http://www.instructure.com/policies/privacy-policy-instructure']").remove();
    $("a[href='http://www.instructure.com/policies/terms-of-use']").remove();
    $("a[href='http://facebook.com/instructure']").remove();
    $("a[href='http://twitter.com/instructure']").remove();

     

     //Add new
     $('#footer-links').append('<a href="http://www.btc.ctc.edu/">Bellingham Technical College </a>');
     $('#footer-links').append('<a href="http://www.facebook.com/bellinghamtech">Facebook</a>');   
    
    //After footer
    $('a#login_forgot_password').text('How do I reset my password?');
    $('.login-options').append('<br/><a id="login_forgot_password" class="show_password_hint" href="#">What is my default password?</a>');  
   // $('div#forgot_password_form').text($(this).attr("data-text"));

//$("li.section:contains('Conferences')").hide();

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



 
    
