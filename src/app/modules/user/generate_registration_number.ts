import { AdminModel } from "../admin/admin.model";
import StudentModel from "../student/student.model";

const last_user_id = async (of: string) => {
  if (of === "student") {
    const result = await StudentModel.findOne().sort({ createdAt: -1 }); // latest student

    return result?.registration_number || null;
  }
  if (of === "admin") {
    const result = await AdminModel.findOne().sort({ createdAt: -1 }); // latest student

    return result?.registration_number || null;
  }
  return null;
};

export const generate_admin_reg_numb = async (): Promise<string> => {
  // Example: S-20250211-0001
  const last_student_registration_number = await last_user_id("admin");

  const now = new Date();
  const current_year = now.getFullYear().toString();
  const current_month = String(now.getMonth() + 1).padStart(2, "0");
  const current_day = String(now.getDate()).padStart(2, "0");

  // Generate date part like 20250211
  const current_date_part = `${current_year}${current_month}${current_day}`;

  let new_reg_num: string;

  if (last_student_registration_number) {
    // Extract year part from the previous registration number
    const last_date_part = last_student_registration_number.split("-")[1]; // e.g. "20250211"
    const last_serial = parseInt(last_student_registration_number.slice(-4)); // last 4 digits

    if (last_date_part?.startsWith(current_year)) {
      // Same year — increase last 4 digits by 1
      const new_serial = (last_serial + 1).toString().padStart(4, "0");
      new_reg_num = `S-${current_date_part}${new_serial}`;
    } else {
      // New year — start again from 0001
      new_reg_num = `S-${current_date_part}0001`;
    }
  } else {
    // No student yet — start fresh
    new_reg_num = `A-${current_date_part}0001`;
  }

  return new_reg_num;
};
export const generate_student_reg_numb = async (): Promise<string> => {
  // Example: S-20250211-0001
  const last_student_registration_number = await last_user_id("student");

  const now = new Date();
  const current_year = now.getFullYear().toString();
  const current_month = String(now.getMonth() + 1).padStart(2, "0");
  const current_day = String(now.getDate()).padStart(2, "0");

  // Generate date part like 20250211
  const current_date_part = `${current_year}${current_month}${current_day}`;

  let new_reg_num: string;

  if (last_student_registration_number) {
    // Extract year part from the previous registration number
    const last_date_part = last_student_registration_number.split("-")[1]; // e.g. "20250211"
    const last_serial = parseInt(last_student_registration_number.slice(-4)); // last 4 digits

    if (last_date_part?.startsWith(current_year)) {
      // Same year — increase last 4 digits by 1
      const new_serial = (last_serial + 1).toString().padStart(4, "0");
      new_reg_num = `S-${current_date_part}${new_serial}`;
    } else {
      // New year — start again from 0001
      new_reg_num = `S-${current_date_part}0001`;
    }
  } else {
    // No student yet — start fresh
    new_reg_num = `S-${current_date_part}0001`;
  }

  return new_reg_num;
};
