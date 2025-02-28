let OTPlessSignin: any;

export const initOTPless = (callback: Function) => {
  const otplessInit = Reflect.get(window, "otplessInit");

  const loadScript = () => {
    const isScriptLoaded = document.getElementById("otpless-sdk");
    if (isScriptLoaded) return;

    const script = document.createElement("script");
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.src = "https://otpless.com/v4/auth.js";
    script.setAttribute("data-appid", "VIGSX9QBLGAGZRFYB5BH");
    script.setAttribute("alsndlas", "true"); // Add the custom attribute here
    document.body.appendChild(script);
    script.onload = () => {
      const callback = (eventCallback) => {
        // console.log({eventCallback});

        const ONETAP = () => {
          const { response } = eventCallback;
          const token = response.token;
          // Implement your custom logic here.
          console.log({
            response,
            token: response.token,
          });
        };

        const OTP_AUTO_READ = () => {
          const {
            response: { otp },
          } = eventCallback;
          // Auto-read OTP value
          //console.log(otp);
        };

        const FAILED = () => {
          const { response } = eventCallback;

          console.log({
            response,
          });
        };

        const FALLBACK_TRIGGERED = () => {
          const { response } = eventCallback;

          console.log({
            response,
          });
        };

        const EVENTS_MAP = {
          ONETAP,
          OTP_AUTO_READ,
          FAILED,
          FALLBACK_TRIGGERED,
        };

        if ("responseType" in eventCallback)
          EVENTS_MAP[eventCallback.responseType]();
      };
      // Initialize OTPLESS SDK with the defined callback.
      OTPlessSignin = new OTPless(callback);
      window.OTPlessSignin = OTPlessSignin;
    };
  };

  otplessInit ? otplessInit() : loadScript();

  Reflect.set(window, "otpless", callback);
};

export { OTPlessSignin };