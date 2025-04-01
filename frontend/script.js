
document.getElementById('findRadius').addEventListener('click', function() {
    const canvas = document.getElementById('circle');
    const ctx = canvas.getContext('2d');
    let radius = 0;
    const maxRadius = 100; // Example radius value

 
    function drawCircle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (radius < maxRadius) {
            radius += 1;
            requestAnimationFrame(drawCircle);
        }
    }

    
    drawCircle();
    
    document.getElementById("result").innerHTML = document.getElementById("resp").innerText+" cm";
    document.getElementById("result").innerText = document.getElementById("resp").innerText+" cm";
    console.log( document.getElementById("resp").innerText+" cm");
   
});
 
document.getElementById('findRadius').addEventListener('click', function() {
    const canvas = document.getElementById('circle');
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let radius = 90; // Example radius value
    let angle = 0;
 
    function drawNeedle() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
 
        const needleX = centerX + radius * Math.cos(angle);
        const needleY = centerY + radius * Math.sin(angle);
 
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(needleX, needleY);
        ctx.stroke();
 
        angle += 0.05; // Adjust the speed of the needle
        if (angle < 2 * Math.PI) {
            requestAnimationFrame(drawNeedle);
        }
    }
 
    drawNeedle();
});



document.getElementById('signinBtn').addEventListener('click', function() {
    showModal('Sign In', 'signInForm');
});

document.getElementById('signupBtn').addEventListener('click', function() {
    showModal('Sign Up', 'signUpForm');
});

document.getElementById('closeModal').addEventListener('click', closeModal);

document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("Sign In Successful!");
    closeModal();
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert("SSign Up Successful!");
    closeModal();
});

function showModal(title, formId) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    document.querySelectorAll('.authForm').forEach(form => form.style.display = 'none');
    document.getElementById(formId).style.display = 'block';
}

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}



let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
}


setInterval(() => {
    changeSlide(1);
}, 5000);

const radiusForm = document.getElementById("radiusForm");
const dataType = document.getElementById("dataType");
const valueInput = document.getElementById("valueInput");
const result = document.getElementById("result");

// dataType.addEventListener("change", () => {
// const selectedValue = dataType.value;
// if (selectedValue === "diameter") {
//     valueInput.innerHTML = `
//         <label for="dataValue">Enter Diameter  </label> <br/>
//         <input type="number" id="dataValue" placeholder="Enter Diameter (cm)" required>
//     `;
// } else if (selectedValue === "circumference") {
//     valueInput.innerHTML = `
//         <label for="dataValue">Enter Circumference  </label><br/>
//         <input type="number" id="dataValue" placeholder="Enter Circumference (cm)" required>
//     `;
// } else if (selectedValue === "area") {
//     valueInput.innerHTML = `
//         <label for="dataValue">Enter Area  </label><br/>
//         <input type="number" id="dataValue" placeholder="Enter Area (cm²)" required>
//     `;
// } else if (selectedValue === "area-angle") {
//     valueInput.innerHTML = `
//         <label for="areaValue">Enter Area  </label><br/>
//         <input type="number" id="areaValue" placeholder="Enter Area (cm²)" required><br/>
//         <label for="angleValue">Enter Angle  </label><br/>
//         <input type="number" id="angleValue" placeholder="Enter Angle (degrees)" required>
//     `;
// } else if (selectedValue === "sector-area") {
//     valueInput.innerHTML = `
//         <label for="sectorAreaValue">Enter Sector Area  </label><br/>
//         <input type="number" id="sectorAreaValue" placeholder="Enter Sector Area (cm²)" required><br/>
//         <label for="sectorAngleValue">Enter Angle </label><br/>
//         <input type="number" id="sectorAngleValue" placeholder="Enter Angle (degrees)" required>
//     `;
// }
// });


document.addEventListener("DOMContentLoaded", () => {
    const radiusForm = document.getElementById("radiusForm");
    const dataType = document.getElementById("dataType");
    const valueInputDiv = document.getElementById("valueInput");
    const dataType1 = document.getElementById("dataType1");
    const valueInputDiv1 = document.getElementById("valueInput1");
    const result = document.getElementById("resp");
    radiusForm.appendChild(result);

    dataType.addEventListener("change", () => {
        valueInputDiv.innerHTML = "";
        const selectedType = dataType.value;

        if (selectedType === "area-angle" || selectedType === "sector-area") {
            valueInputDiv.innerHTML = `
                <label for="value">Enter Area:</label>
                <input type="number" id="value" required>

                <label for="angle">Enter Angle:</label>
                <input type="number" id="angle" required>
            `;
        } else if (selectedType) {
            valueInputDiv.innerHTML = `
                <label for="value">Enter Value:</label>
                <input type="number" id="value" required>
            `;
        }
    });
    dataType1.addEventListener("change", () => {
        valueInputDiv1.innerHTML = "";
        

      
            valueInputDiv1.innerHTML = `
                <label for="value1">Enter Value:</label>
                <input type="number" id="value1" required>
            `;
       
    });

    radiusForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const type = dataType.value;
        const value = document.getElementById("value")?.value;
        const angle = document.getElementById("angle")?.value;

        if (!type || !value) {
            result.textContent = "Please enter required values.";
            return;
        }

        let url = `http://localhost:3000/calculate-radius?type=${type}&value=${value}`;
        if (angle) {
            url += `&angle=${angle}`;
        }

        try {
            const response = await fetch(url);
            const text = await response.text();
            result.textContent = `Radius:${text}`;
            
            document.getElementById("result").innerHTML = text+" cm";
            document.getElementById("result").innerText = text+" cm";
            console.log( document.getElementById("resp").innerText+" cm");
        } catch {
            result.textContent = "Error fetching radius.";
        }
    });
    document.getElementById('playForm').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        const type = dataType1.value;
        const value = document.getElementById("value1")?.value;
       
        
        const result = document.getElementById('resp1'); // Get result display element
        //console.log(type+" "+value);
        // Validate inputs: Ensure both the dropdown and input field are filled
        if (!type || !value) {
            result.textContent = "Please enter all required values."; // Display error message
            return;
        }
    
        // Construct the API URL with query parameters
        const url = `http://localhost:3000/plycircles?type=${type}&value=${value}`;
    
        try {
            const response = await fetch(url); // Fetch data from the API
            const text = await response.text(); // Parse response as text
    
            // Display the response in the result element
            result.innerHTML = ` ${text}`;
        } catch (error) {
            // Display an error message in case of a network or API failure
            result.textContent = "Error fetching data. Please try again.";
        }
    });
    
    
    // playForm.addEventListener("submit", async (e) => {
    //     e.preventDefault();

    //     const type = dataType1.value;
    //     const value = document.getElementById("inp")?.value;
        

    //     if (!type || !value) {
    //         result.textContent = "Please enter required values.";
    //         return;
    //     }

    //     let url = `http://localhost:3000/plycircles?type=${type}&value=${value}`;
        

    //     try {
    //         const response = await fetch(url);
    //         const text = await response.text();
    //        document.getElementById('resp1').innerHTML = `${text}`;
            
    //        ;
    //     } catch {
    //         result.textContent = "Error fetching radius.";
    //     }
    // });
});


