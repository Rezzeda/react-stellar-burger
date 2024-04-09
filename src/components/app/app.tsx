import styles from "./app.module.css";
import AppHeader from '../app-header/app-header';
import { useState, useEffect } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NotFoundPage from "../../pages/not-found/not-found";
import LoginPage from "../../pages/login/login";
import HomePage from "../../pages/home/home";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientPage from "../../pages/ingredient/ingredient";
import { checkUserAuth } from "../../services/userSlice";
import ProtectedRoute from "../protected-route/protected-route";
import { fetchIngredients } from "../../services/ingredientsSlice";
import { loginUser, registerUser } from "../../services/userSlice";
import { useAppDispatch } from "../../hooks/appHooks";
import FeedPage from "../../pages/feed/feed";
import OrderInfo from "../../pages/order-info/order-info";
import ProfileInfo from "../profile-info/profile-info";
import OrdersHistory from "../../pages/orders-history/orders-history";

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [ingredientDetailsModal, setIngredientDetailsModal] = useState(null);

  useEffect(() => {
    dispatch(fetchIngredients());
}, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  const clbLogin = (dataUser: { email: string; password: string }) => {
    dispatch(loginUser(dataUser));
  };

  const clbRegister = (dataUser: {name: string; email: string;  password: string;}) => {
    dispatch(registerUser(dataUser));
  };

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);
  
  return (
    <div className={styles.app}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
      <main className={styles.content}>
        <Routes 
          location={ state && state.backgroundLocation 
          ? state.backgroundLocation
          : location}>
            <Route path="/" element={<HomePage setIngredientDetailsModal={setIngredientDetailsModal} setOrderDetailsModal={setOrderDetailsModal} />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/login" element={
              <ProtectedRoute onlyUnAuth>
                  <LoginPage onLogin={clbLogin} />
              </ProtectedRoute>
            }
            />
            <Route path="/register" element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage onRegister={clbRegister} />
              </ProtectedRoute>
            }
            />
            <Route path="/forgot-password" element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
            />
            <Route path="/reset-password" element={
              <ProtectedRoute onlyUnAuth>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
            />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage>
                  <ProfileInfo/>
                </ProfilePage>
              </ProtectedRoute>
            }
            />
            <Route path="/profile/orders" element={
              <ProtectedRoute>
                <ProfilePage>
                  <OrdersHistory />
                </ProfilePage>
              </ProtectedRoute>
            } />
            <Route path="/profile/orders/:number" element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
            <Route path="/ingredients/:id" element={<IngredientPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:number" element={<OrderInfo />} />
        </Routes>
      </main>
      </DndProvider>
      {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal onClose={closeModal} title={'Детали ингредиента'} style={{ width: '720px', height: '538px' }}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path="/feed/:number"
              element={
                <Modal title="Детали заказа" onClose={closeModal}  style={{ width: "640px", height: "620px" }}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path="/profile/orders/:number"
              element={
                <ProtectedRoute>
                  <Modal title="Детали заказа" onClose={closeModal} style={{ width: "640px", height: "620px" }}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
        {orderDetailsModal && (
          <Modal title={""} onClose={() => setOrderDetailsModal(false)} style={{ width: "720px", height: "718px" }}>
            <OrderDetails />
          </Modal>
        )}
      {/* {ingredientDetailsModal && (
        <Modal onClose={() => setIngredientDetailsModal(null)} title={'Детали ингредиента'} style={{ width: '720px', height: '538px' }}>
        <IngredientDetails selectedIngredient={ingredientDetailsModal} />
        </Modal>
    )} */}
    </div>
  );
}