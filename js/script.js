const nameInput = document.getElementById(`name`);
const jobRoleMenu = document.getElementById(`title`);
const otherJobRole = document.getElementById(`other-job-role`);
const shirtDesign = document.getElementById(`design`);
const shirtColor = document.getElementById(`color`);

nameInput.focus();

otherJobRole.style.display = `none`;

// Displays the "Other Job Role" field only when the user selects the "Other" option in the "Job Role" menu.
// If the user selects another option, after having selected the "Other" option,
// the "Other job role" field is hidden from view once again.
jobRoleMenu.addEventListener(`change`, (e)=>{
  const selectedJob = e.target.value;
  if (selectedJob === `other`){
    otherJobRole.style.display = `block`;
  } else {
    otherJobRole.style.display = `none`;
  }
});

shirtColor.disabled = true;

// Enables the "Color" menu once a theme is selected. 
// The color options are displayed/hidden based on which theme the user has selected.
shirtDesign.addEventListener(`change`, (e)=>{
  const selectedTheme = e.target.value;
  shirtColor.disabled = false;
  for (let i=0; i<shirtColor.children.length; i++){
    const colorOption = shirtColor.children[i];
    const dataTheme = colorOption.getAttribute(`data-theme`);
    if (dataTheme === selectedTheme) {
      colorOption.style.display = `block`;
    } else {
      colorOption.style.display = `none`;
    }
  }
});


