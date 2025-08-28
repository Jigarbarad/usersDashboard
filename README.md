# Dashboard-with-Charts
This project is a **Frontend User Dashboard** built with **HTML, CSS, JavaScript, Bootstrap, and Chart.js**.   It fetches user data from a mock API and displays it in a structured, interactive, and visually appealing way.

# 📊 Zymr Assignment - User Dashboard

This project is a **Frontend User Dashboard** built with **HTML, CSS, JavaScript, Bootstrap, and Chart.js**.  
It fetches user data from a mock API and displays it in a structured, interactive, and visually appealing way.

## 🚀 Features
- Responsive Dashboard UI built with Bootstrap  
- Fetch & Display Users from a mock API (`mockapi.io`)  
- Pagination Support – view users page by page (10 per page)  
- Sorting Support – sort user list by name (ascending/descending)  
- Charts & Statistics powered by Chart.js  
  - Displays daily user sign-ups  
  - Shows data in line/bar charts  
- Total Users Count displayed dynamically  
- Modern Navbar with brand and responsive menu  
- Icon Set for email, GitHub, LinkedIn, and profile  

## 📂 Project Structure
├── index.html # Main HTML entry point
├── style.css # Stylesheet
├── app.js # JavaScript logic (API, charts, pagination, sorting)
├── dashboard.png # Preview image of the dashboard
├── icons/ # Asset icons (email, GitHub, LinkedIn, profile)


## ⚙️ How It Works
1. On page load, the app fetches data from the Mock API:  
   `https://6874ce63dd06792b9c954fc7.mockapi.io/api/v1/users`  
2. Data is stored in memory (`users` array).  
3. Dashboard renders:  
   - Total user count  
   - Charts (based on signup dates)  
   - Paginated user list (10 users per page)  
   - Sorted by name by default  
4. Users can:  
   - Navigate pages  
   - Change sorting order  
   - View interactive charts  

## 🖼️ Preview
![Dashboard Preview](./dashboard.png)

## 🛠️ Technologies Used
- HTML5 – Structure  
- CSS3 – Styling & layout  
- Bootstrap 5 – Responsive design  
- JavaScript (ES6) – Logic, API calls, DOM updates  
- Chart.js – Interactive charts  

## 📦 Setup & Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/zymr-assignment.git
2. Navigate into the project folder:
    cd zymr-assignment
