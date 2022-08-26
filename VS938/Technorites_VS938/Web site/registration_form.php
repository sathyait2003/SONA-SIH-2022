<!DOCTYPE html>
<html lang="en">

<head>
  <title>Pratikriya Vishleshan | Registration</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link rel="icon" type="image/x-icon" href="./img/All_India_Council_for_Technical_Education_logo-removebg-preview.png" />
  <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet" />
  <link rel="stylesheet" href="style.css" />
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .mainflex {
      display: flex;
      justify-content: space-around;
      height: 100%;
      background: #52be73;
    }

    .mainflex-1 {
      padding-top: 5%;
      flex: 40%;
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 10px;
      font-size: 18px;
    }

    .mainflex-2 {
      padding-top: 5%;
      flex: 60%;
      height: 100%;
      background-color: #faf6e5;
      border-radius: 150px 0px 0px 600px;
    }

    .heading {
      font-size: 3rem;
      color: azure;
    }

    .loginHeading {
      color: #0d4f8b;
    }

    .smallHeading {
      font-size: 1.75rem;
      color: azure;
      padding-top: 10px;
    }

    .formContainer {
      height: 100%;
      display: flex;
      flex-direction: column;

      align-items: center;
      gap: 10px;
    }

    .login-flex {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 12px 20px;
      width: 30vw;
    }

    .button {
      font-size: 16px;
      margin-top: 10px;
      padding: 1vw 5vw;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 0px 10px 0px #f9d78f;
      margin-bottom: 100px;
    }

    .button:hover {
      /* box-shadow: 2px 2px 2px 1px; */
      /**rgb(0, 198, 255, 0.5);**/
      box-shadow: 0px 0px 26px 0px #f9d78f;
    }

    .formContainer div select,
    .forgotPassword {
      cursor: pointer;
    }

    .hide_label {
      display: none;
    }

    img {
      height: 150px;
    }

    @media only screen and (max-width: 800px) {
      .mainflex {
        flex-direction: column;
        width: 100%;
        gap: 20px;
      }

      .mainflex-1 {
        margin-top: 50px;
        width: 100%;
        padding: 10px;
      }

      .mainflex-2 {
        border-radius: 20px 20px 0px 0px;
        width: 100%;
      }

      .login-flex {
        width: 80%;
      }

      .button {
        width: 50%;
        height: 40px;
      }
    }
  </style>
</head>

<body>
  <div class="mainflex">
    <div class="mainflex-1">
      <div>
        <img src="./img/All_India_Council_for_Technical_Education_logo-removebg-preview.png" alt="AICTE logo" />
      </div>
      <div class="heading">Welcome</div>
      <p class="p">Register to start exploring the Feedback form Program</p>
      <div class="smallHeading">General Information</div>
      <p class="p">1. Kindly fill all the relevent information correctly.</p>
      <p class="p">
        2. Do not share your credential details like password with anyone.
      </p>
    </div>
    <form class="mainflex-2" action="" method="post">
      <div class="formContainer">
        <div class="loginHeading heading">Registration</div>
        <label for="AISHE_Code" class="hide_label">AISHE Code</label>
        <input type="text" id="AISHE_Code" class="login-flex" name="AISHE_Code" title="AISHE Code required"
          placeholder="AISHE Code" required />
        <label for="Institute_name" class="hide_label">Institute Name</label>
        <input type="text" id="Institute_name" class="login-flex" name="Institute_name" placeholder="Institute Name" />
        <label for="Institute_address" class="hide_label">Institute Address</label>
        <input type="text" id="Institute_address" class="login-flex" name="Institute_address"
          placeholder="Institute Address" />
        <label for="institute_state" class="hide_label">State</label>
        <select id="institute_state" class="login-flex" name="institute_state" onchange="makeCitySubMenu(this.value)">
          <option value="" disabled selected style="background-color: #aaa; color: #fff">
            States
          </option>
          <option value="AndhraPradesh">Andra Pradesh</option>
          <option value="ArunachalPradesh">Arunachal Pradesh</option>
          <option value="Assam">Assam</option>
          <option value="Bihar">Bihar</option>
          <option value="Chhattisgarh">Chhattisgarh</option>
          <option value="Goa">Goa</option>
          <option value="Gujarat">Gujarat</option>
          <option value="Haryana">Haryana</option>
          <option value="HimachalPradesh">Himachal Pradesh</option>
          <option value="JammuKashmir">Jammu and Kashmir</option>
          <option value="Jharkhand">Jharkhand</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Kerala">Kerala</option>
          <option value="MadhyaPradesh">Madhya Pradesh</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
          <option value="Mizoram">Mizoram</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Odisha">Odisha</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Sikkim">Sikkim</option>
          <option value="TamilNadu">Tamil Nadu</option>
          <option value="Telangana">Telangana</option>
          <option value="Tripura">Tripura</option>
          <option value="Uttaranchal">Uttaranchal</option>
          <option value="UttarPradesh">Uttar Pradesh</option>
          <option value="WestBengal">West Bengal</option>
          <option disabled style="background-color: #aaa; color: #fff">
            UNION Territories
          </option>
          <option value="AndamanNicobar">Andaman and Nicobar Islands</option>
          <option value="Chandigarh">Chandigarh</option>
          <option value="DadraHaveli">Dadar and Nagar Haveli</option>
          <option value="DamanDiu">Daman and Diu</option>
          <option value="Delhi">Delhi</option>
          <option value="Lakshadeep">Lakshadeep</option>
          <option value="Pondicherry">Pondicherry</option>
        </select>
        <label for="institute_city" class="hide_label">District</label>
        <select id="institute_city" class="login-flex" name="institute_city">
          <option value="" disabled selected>District</option>
          <option></option>
        </select>
        <label for="HEI_email" class="hide_label">HEI Official Email-Id</label>
        <input type="email" id="HEI_email" class="login-flex" name="HEI_email" title="Valid-Email"
          placeholder="HEI Official Email-Id" required />
        <label for="phone" class="hide_label">Phone No.</label>
        <input type="tel" name="faculty_mobile" id="faculty_phone_no" class="login-flex" pattern="[0-9]{10}"
          title="Ten digits code" placeholder="Mobile Number" required />
        <label for="new_password" class="hide_label">Set New Password</label>
        <input type="password" id="new_password" class="login-flex" name="new_password" title="Password Required"
          placeholder="New Password" required />
        <label for="confirm_password" class="hide_label">Confirm Password</label>
        <input type="password" id="confirm_password" class="login-flex" name="confirm_password"
          title="Confirm Password Required" placeholder="Confirm Password" required />
        <input class="button" type="submit" value="Submit" name="submit" />
      </div>
    </form>
  </div>
  <?php
    include './db_connection.php';
    $insert = false;
    if(isset($_POST['submit'])){
      $con=OpenCon();

      if(!$con){
          die("not connect to database" . mysqli_connect_error());
      }
      $AISHE=$_POST['AISHE_Code'];
      $institute_name=$_POST['Institute_name'];
      $institute_address=$_POST['Institute_address'];
      $state=$_POST['institute_state'];
      $city=$_POST['institute_city'];
      $email=$_POST['HEI_email'];
      $mobile=$_POST['faculty_mobile'];
      $password=$_POST['new_password'];
      $pincode=123456;
      $role='HEI';

      $data = "INSERT INTO technvxg_pratikriya_vishleshan.college(`AISHE_id`, `clg_name`, `HEI_name`, `HEI_email`, `HEI_contact`, `clg_city`, `clg_state`, `clg_pincode`) VALUES ('$AISHE','$institute_name','$institute_name','$email','$mobile','$city','$state','$pincode');";
      $data1 = "INSERT INTO technvxg_pratikriya_vishleshan.login_cred(`role`, `college_id`, `username`, `password`) VALUES ('$role','$AISHE','$email','$password');";
      $data2 = "INSERT INTO technvxg_pratikriya_vishleshan.college_rank VALUES ('$college_id','$date',0,0);";
      // $result = mysqli_query($con,$data);
      if($con->query($data) and $con->query($data1) and $con->query($data2)){
        header("Location: ./login.php");
      }
      $con->close();

      
    }
?>
</body>
<script>
  var citiesByState = {
    AndhraPradesh: [
      "Anantapur",
      "Chittoor",
      "East Godavari",
      "Guntur",
      "Kadapa",
      "Krishna",
      "Kurnool",
      "Prakasam",
      "Nellore",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godavari",
    ],

    ArunachalPradesh: [
      "Anjaw",
      "Changlang",
      "Dibang Valley",
      "East Kameng",
      "East Siang",
      "Kra Daadi",
      "Kurung Kumey",
      "Lohit",
      "Longding",
      "Lower Dibang Valley",
      "Lower Subansiri",
      "Namsai",
      "Papum Pare",
      "Siang",
      "Tawang",
      "Tirap",
      "Upper Siang",
      "Upper Subansiri",
      "West Kameng",
      "West Siang",
      "Itanagar",
    ],
    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup (Rural)",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir Champa",
      "Jashpur",
      "Kabirdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Mewat",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    HimachalPradesh: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
    JammuKashmir: [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kargil",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Leh",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    Karnataka: [
      "Bagalkot",
      "Bangalore Rural",
      "Bangalore Urban",
      "Belgaum",
      "Bellary",
      "Bidar",
      "Vijayapura",
      "Chamarajanagar",
      "Chikkaballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Gulbarga",
      "Hassan",
      "Haveri",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysore",
      "Raichur",
      "Ramanagara",
      "Shimoga",
      "Tumkur",
      "Udupi",
      "Uttara Kannada",
      "Yadgir",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    MadhyaPradesh: [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
    Nagaland: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Debagarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundergarh",
    ],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Firozpur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Mohali",
      "Muktsar",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sangrur",
      "Shaheed Bhagat Singh Nagar",
      "Tarn Taran",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Ganganagar",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    TamilNadu: [
      "Ariyalur",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivaganga",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruvarur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar",
      "Jogulamba",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem",
      "Mahabubabad",
      "Mahbubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Ranga Reddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal Rural",
      "Warangal Urban",
      "Yadadri Bhuvanagiri",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    UttarPradesh: [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kheri",
      "Kushinagar",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "Varanasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
    WestBengal: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Bardhaman",
      "Paschim Medinipur",
      "Purba Bardhaman",
      "Purba Medinipur",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur",
    ],
    AndamanNicobar: ["Nicobar", "North Middle Andaman", "South Andaman"],
    Chandigarh: ["Chandigarh"],
    DadraHaveli: ["Dadra Nagar Haveli"],
    DamanDiu: ["Daman", "Diu"],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    Lakshadeep: ["Lakshadweep"],
    Pondicherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  };
  function makeCitySubMenu(value) {
    if (value.length == 0)
      document.getElementById(
        "institute_city"
      ).innerHTML = `<option value="" disabled selected>Plese Choose State </option>`;
    else {
      var citiesOptions = "";
      for (cityId in citiesByState[value]) {
        citiesOptions +=
          "<option>" + citiesByState[value][cityId] + "</option>";
      }
      document.getElementById("institute_city").innerHTML = citiesOptions;
    }
  }
</script>

</html>