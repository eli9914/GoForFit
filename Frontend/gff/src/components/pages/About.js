import React from 'react'
import './Pages.css';

function About() {
  return (
    <div className='about'>
        <div className='about-text'>
            <h1>קצת עלינו</h1>
            <br/>
            <p>.במהלך שנת 2019 פרצה מגפת הקורונה אשר שיבשה את הסדר העולמי בכל ההיבטים</p>
            <p>.אחת ההשפעות המרכזיות היא על השינויים הפיזיים שחלו בקרב בני האדם</p>
            <p>.החל מהגברת עייפות תוך השמנה ועד לפגיעה במוטוריות של האדם</p>
            <p>!אנו מאמינים כי האדם הוא המכונה הכי חזקה שקיימת ביקום ולכן היא יכולה לנצח הכל</p>
            <p>בנוסף, גם אנחנו בתור אנשי ספורט יודעים עד כמה זה קשה לשלב ולהיות מחויב באופן</p>
            <p>.טוטאלי לשגרת האימונים הקשה</p>
            <p>לכן ,לאחר מחשבה עמוקה והמון השקעה הבנו כי על מנת לעמוד במטרות האלו יש לייצר</p>
            <p>פלטפורמת אימון עם אנשי מקצוע מהרמה הגבוהה ביותר אשר יקדישו את מיטב כוחם וזמנם</p>
            <p>.עבור מתאמנים חדשים וותיקים שרוצים לחזור לכושר ולשלב זאת יחד בלו"ז המשימות השבועי</p>
            <p>Go For Fit with us ...אז קדימה למה אתם מחכים</p>
            <img className='tomer' src={require('./OurTeam/Tomer.jpg')} alt="" />
            <img className='eli' src={require('./OurTeam/Eli.jpg')} alt="" />
            <img className='matan' src={require('./OurTeam/Matan.jpg')} alt="" />
            <img className='yuval' src={require('./OurTeam/Yuval.jpg')} alt="" />
            <p>יובל אפרת&emsp;&emsp;&emsp;&emsp;&emsp;מתן בן ישי&emsp;&emsp;&emsp;&emsp;&emsp;אלי אמוייב&emsp;&emsp;&emsp;&emsp;&emsp;תומר בן שימול&emsp;&emsp;&emsp;&emsp;</p>
        </div>
    </div>
  )
}

export default About