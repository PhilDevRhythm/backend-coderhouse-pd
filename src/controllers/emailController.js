import { transporter } from "../services/emailServices.js";

export const sendEmailEthereal = async (req, res) => {
  try {
    const response = await transporter.send(req, res);
  } catch (error) {
    console.log(error);
  }
};
