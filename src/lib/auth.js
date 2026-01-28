import { supabase } from "./supabaseClient";

// USER SIGN UP
export const signUpUser = async (email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// USER LOGIN
export const signInUser = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// GET CURRENT USER
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

// LOGOUT
export const signOutUser = async () => {
  await supabase.auth.signOut();
};