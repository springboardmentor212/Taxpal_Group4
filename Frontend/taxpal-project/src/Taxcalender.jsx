import { useEffect, useState } from "react";
import "./Taxcalender.css";
function Taxcalender() {
  const [reminders, setReminders] = useState([]);
  useEffect(() => {
    try {
      const savedReminders = JSON.parse(localStorage.getItem("taxReminders")) || [];
      setReminders(savedReminders);
    } catch (err) {
      console.error("Failed to load tax data", err);
    }
  }, []);
  return (
    <div className="tax-container">
      <div className="tax-card-wrapper">
        <h2 className="main-title">Tax Calendar</h2>
        <p>Check your tax remainders and Payments</p>
        <br></br>
        <div className="calendar-list">
          {reminders.length === 0 ? (
            <p className="empty-text">No upcoming tax reminders</p>
          ) : (
            reminders.map((item, index) => (
              <div key={index} className="calendar-card">
                <div className="calendar-info">
                  <span className="item-title">{item.title}</span>
                  <p className="item-date">{item.date}</p>
                  <p className="item-description">
                    {item.type === 'reminder' 
                      ? `Reminder for upcoming ${item.quarter || 'tax'} payment` 
                      : `${item.quarter || 'Quarterly'} estimated tax payment due`}
                  </p>
                </div>
                <div className={`badge ${item.type}`}>
                  {item.type}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <br></br>
      <div className="note-class">
        <p> For More details about the latest Tax Slabs Please Visit:-  
            <a href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1" target="_blank" rel="noreferrer">
               https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1
           </a>
        </p>
        <p><b>Note:-</b> The tax rate calculation is based on <b>FY 2025-26</b> for latest details Please visit:- 
            <a href="https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1" target="_blank" rel="noreferrer">
               https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1
           </a>
        </p>
      </div>
    </div>
  );
}

export default Taxcalender;