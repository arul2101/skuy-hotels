import supabase from "@/services/supabase";

async function signup(request) {
  const { data, error } = await supabase.auth.signUp({
    email: request.email,
    password: request.password,
    options: {
      data: {
        full_name: request.full_name,
        avatar: ""
      }
    }
  })

  if (error) throw new Error(error.message);
  return data;
}

async function login(request) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: request.email,
    password: request.password
  });

  if (error) throw new Error(error.message);
  return data;
}

async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

async function updateCurrentUser(request) {
  let updateData;

  if (request.password) updateData = { password: request.password };
  if (request.full_name) updateData = { data: { full_name: request.full_name } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  return data;
}

export {
  signup,
  login,
  getCurrentUser,
  logout,
  updateCurrentUser
}