import React from 'react';
import {SlTrash} from "react-icons/sl"

function Profile() {
    return (
        <div className='profile'>
            <div className='container'>
                <div>
                    <h2>Фото профиля</h2>
                    <div>
                        <img/>
                        <button>Выберите файл</button>
                        <p><SlTrash/></p>
                        <span>Максимальный размер фото 5МБ</span>
                    </div>

                </div>
                

            </div>
            Profile
        </div>
    );
}

export default Profile;