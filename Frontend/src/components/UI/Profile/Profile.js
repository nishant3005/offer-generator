import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const Profile = (props) => {
  const [user] = useState(JSON.parse(localStorage.getItem('userdata')));
  console.log(props);
  const updateItems = async () => {
    await axios
      .get(
        `https://offer-generator-backend.onrender.com/resume/history/${user.email}`
      )
      .then((response) => {
        props.setResume(response.data);
        console.log('data received!');
      })
      .catch((err) => {
        alert('error!');
      });

    await axios
      .get(
        `https://offer-generator-backend.onrender.com/offer_letter/history/${user.email}`
      )
      .then((response) => {
        props.setOfferLetter(response.data);
        console.log('data received!');
      })
      .catch((err) => {
        alert('error!');
      });
  };

  useEffect(() => {
    updateItems();
  }, []);

  return (
    <div className="profile">
      <div className="header">
        Your History for email id <b>{props.email}</b>
      </div>
      <div className="table-area">
        <table>
          <tbody>
            <tr>
              <th>Date Created</th>
              <th>Type of Document</th>
              <th>Edit Link</th>
            </tr>
            {props.resume.map((resume, index) => (
              <tr key={index}>
                <td>{resume.date}</td>
                <td>Resume</td>
                <td>
                  <Link to={`/edit/resume/${resume._id}`}>edit</Link>
                </td>
              </tr>
            ))}
            {props.offerLetter.map((ol, index) => (
              <tr key={index}>
                <td>{ol.date}</td>
                <td>Offer Letter</td>
                <td>
                  <Link to={`/edit/offer_letter/${ol._id}`}>edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
