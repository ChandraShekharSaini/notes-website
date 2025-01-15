
const useCustomHooks = () => {
    const handleGoogleAuth = () => {
      window.location.href = "http://localhost:4000/auth/google"
    }
    return {handleGoogleAuth};
}

export default useCustomHooks