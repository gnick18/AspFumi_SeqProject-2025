# Prompt

The goal of the website is to both serve to advertise and inform about a global community science initiative while also serving and the central hub for collecting volunteer metadata via a survey and helping us on the front end create a list of all volunteering labs (things like name, email, location, etc.).
For formatting I was thinking of making it similar to https://html5up.net/read-only as a base barebones construction. The body of the website will include text and pictures I can work with you later on filling in after we have the scaffolds of a website together. The tabs that we will have are:
[Title] Global Aspergillus fumigatus Af293/Cea10 community sequencing initiative
-	About this initiative
-	FAQs
-	Interested in joining the community effort? 
-	Global map of collaborating research labs
-	Metadata form
The about this page will be mostly just text and maybe some images. 
The FAQ will be a standard bolded question with normal text answers. I will also write those myself to add later with your help in inserting the text correctly.
The Interested in joining the community effort will have contact information to get in touch with the organizing team (I will create an email for this group at a later date) in addition hyperlinks to the map and metadata form tabs on the website with accompanying information about what these pages have.
The Map for is the most technically difficult of this project. I want this to have an embedded global map that has a highlight point within the region that every lab who is working with the organization is contained. This can first start by including dots at the list of following states/regions:
-	Madison WI, USA
-	Nashville TN, USA
-	Jena, Germany
The map doesn’t need to be interactable or clickable, but it will need to be dynamic and automatically update after individuals fill out the metadata form. 
Lastly, the metadata form page should give information on what this form is, and then provide a password box. The password is just af932 but this is something that we will give out to labs after they have contacted us and we have asked them to fill out said form in an email alongside the password to do the form. 
The form itself will just be a collection of fill in the blank and multiple choice questions that I will write out with you at a later date. If this form is filled out the answers should be immediately written to a backend tab separated values (TSV) in real time. Any new forms should also attempt to find the location of the volunteer based on the answers in the form and update the map page accordingly. 

Use the following color scheme (CSS code) to make creative design designs:
/* CSS HEX */
--russian-violet: #231942ff;
--ultra-violet: #5e548eff;
--african-violet: #9f86c0ff;
--lilac: #be95c4ff;
--pink-lavender: #e0b1cbff;

/* CSS HSL */
--russian-violet: hsla(255, 45%, 18%, 1);
--ultra-violet: hsla(250, 26%, 44%, 1);
--african-violet: hsla(266, 32%, 64%, 1);
--lilac: hsla(292, 28%, 68%, 1);
--pink-lavender: hsla(327, 43%, 79%, 1);

/* SCSS HEX */
$russian-violet: #231942ff;
$ultra-violet: #5e548eff;
$african-violet: #9f86c0ff;
$lilac: #be95c4ff;
$pink-lavender: #e0b1cbff;

/* SCSS HSL */
$russian-violet: hsla(255, 45%, 18%, 1);
$ultra-violet: hsla(250, 26%, 44%, 1);
$african-violet: hsla(266, 32%, 64%, 1);
$lilac: hsla(292, 28%, 68%, 1);
$pink-lavender: hsla(327, 43%, 79%, 1);

/* SCSS RGB */
$russian-violet: rgba(35, 25, 66, 1);
$ultra-violet: rgba(94, 84, 142, 1);
$african-violet: rgba(159, 134, 192, 1);
$lilac: rgba(190, 149, 196, 1);
$pink-lavender: rgba(224, 177, 203, 1);

/* SCSS Gradient */
$gradient-top: linear-gradient(0deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-right: linear-gradient(90deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-bottom: linear-gradient(180deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-left: linear-gradient(270deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-top-right: linear-gradient(45deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-bottom-right: linear-gradient(135deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-top-left: linear-gradient(225deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-bottom-left: linear-gradient(315deg, #231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);
$gradient-radial: radial-gradient(#231942ff, #5e548eff, #9f86c0ff, #be95c4ff, #e0b1cbff);