import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './Home';
import Entry from './cmp/Entry';
import BeaTasker from './cmp/BeaTasker'
import Userhome from './Userhome';
import ConfirmationPage from './cmp/ConfirmationPage';
import Searchresults from './cmp/searchresult';
import BookingForm from './cmp/BookingForm';
import UserProfile from './cmp/userProfile';
import TaskerProfile from './cmp/taskerProfile';
import UserCancel from './cmp/usercancel';
import TaskerCancel from './cmp/taskercancel';
import CouponBooking from './cmp/CouponBooking';
import UserReviewForm from './cmp/userReview';
import TaskerIncompReasonForm from './cmp/TaskerIncompletedreason'
import UserIncompReasonForm from './cmp/userIncompletedreason'
import DiscountCoupon from './cmp/DiscountCoupon';
import Pendingwork from './cmp/pendingwork';
import UserCompletedwork from './cmp/completedwork';
import UserInCompletedwork from './cmp/UserIncompleted';
import IncomingRequest from './cmp/incomingrequest';
import TaskerPendingWork from './cmp/taskerpendingwork';
import TaskerCompletedWork from './cmp/TaskerCompletedwork';
import TaskerInCompletedWork from './cmp/TaskerIncompleted';
import AdminPanel from './admin/AdminPanel';
import AdminUser from './admin/User';
import AdminUserCancel from './admin/User Cancel';
import AdminUserConfirm from './admin/User Confirm';
import AdminUserIncompleted from './admin/User Incompleted';
import AdminUserPending from './admin/User Pending';
import AdminUserReviews from './admin/User Reviews';
import AdminTasker from './admin/Tasker';
import AdminTaskerCancel from './admin/Tasker Cancel';
import AdminTaskerConfirm from './admin/Tasker Confirm';
import AdminTaskerIncompleted from './admin/Tasker Incompleted';
import AdminTaskerPending from './admin/Tasker Pending';
import AdminTasks from './admin/Tasks';
import AdminBookings from './admin/Bookings';
import AdminIncomingRequests from './admin/Incoming Requests';
import AdminNotifications from './admin/Notifications';
import AdminHome from './admin/Home';
function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Userhome" element={<Userhome />}></Route>
        <Route path="/Entry" element={<Entry />}></Route>
        <Route path="/BeaTasker" element={<BeaTasker />}></Route>
        <Route path="/Confirmation" element={<ConfirmationPage />}></Route>
        <Route path="/searchedresults" element={<Searchresults />}></Route>
        <Route path='/bookingform' element={<BookingForm />}></Route>
        <Route path='/userprofile' element={<UserProfile />}></Route>
        <Route path='/taskerprofile' element={<TaskerProfile />}></Route>
        <Route path='/usercancel' element={<UserCancel />}></Route>
        <Route path='/taskercancel' element={<TaskerCancel />}></Route>
        <Route path='/couponbooking' element={<CouponBooking />}></Route>
        <Route path='/userreviewform' element={<UserReviewForm />}></Route>
        <Route path='/taskerincompreviewform' element={<TaskerIncompReasonForm />}></Route>
        <Route path='/userincompreviewform' element={<UserIncompReasonForm />}></Route>
        <Route path='/discountcoupon' element={<DiscountCoupon />}></Route>
        <Route path='/userpending' element={<Pendingwork />}></Route>
        <Route path='/usercompleted' element={<UserCompletedwork />}></Route>
        <Route path='/userincompleted' element={<UserInCompletedwork />}></Route>
        <Route path='/incomingrequest' element={<IncomingRequest />}></Route>
        <Route path='/taskerpending' element={<TaskerPendingWork />}></Route>
        <Route path='/taskercompleted' element={<TaskerCompletedWork />}></Route>
        <Route path='/taskerincompleted' element={<TaskerInCompletedWork />}></Route>
        <Route path="/adminpanel" element={<AdminPanel />} >
          <Route path='/adminpanel' element={<AdminHome />} />
          <Route path='/adminpanel/adminuser' element={<AdminUser />} />
          <Route path='/adminpanel/adminuser-cancel' element={<AdminUserCancel />} />
          <Route path='/adminpanel/adminuser-confirm' element={<AdminUserConfirm />} />
          <Route path='/adminpanel/adminuser-incompleted' element={<AdminUserIncompleted />} />
          <Route path='/adminpanel/adminuser-pending' element={<AdminUserPending />} />
          <Route path='/adminpanel/adminuser-reviews' element={<AdminUserReviews />} />
          <Route path='/adminpanel/admintasker' element={<AdminTasker />} />
          <Route path='/adminpanel/admintasker-cancel' element={<AdminTaskerCancel />} />
          <Route path='/adminpanel/admintasker-confirm' element={<AdminTaskerConfirm />} />
          <Route path='/adminpanel/admintasker-incompleted' element={<AdminTaskerIncompleted />} />
          <Route path='/adminpanel/admintasker-pending' element={<AdminTaskerPending />} />
          <Route path='/adminpanel/admintasks' element={<AdminTasks />} />
          <Route path='/adminpanel/adminbookings' element={<AdminBookings />} />
          <Route path='/adminpanel/adminincoming-requests' element={<AdminIncomingRequests />} />
          <Route path='/adminpanel/adminnotifications' element={<AdminNotifications />} />
          </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
