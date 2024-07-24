import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <>
     <div className="container-fluid">
                <div className="row">
                    <nav class="navbar navbar-expand-lg bg-light">
                        <div class="container-fluid">
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/chat">Chat</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/friend_request">Show FriendRequest</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link" to="/user_list">Send FriendRequest</Link>
                                    </li>
                                </ul>
                                <div>
                                    <h1>Chat Application</h1>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
    </>
  )
}

export default Header