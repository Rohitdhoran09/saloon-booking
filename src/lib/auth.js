import { supabase } from "./supabaseClient";

export const signInAdmin = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const getUser = async () => {
  const { data } = await supabase.auth.getUser();
  return data?.user;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};