import { Course } from "../courses/courses.model";
import { Grade } from "../grades/grades.model";
import { Section } from "../sections/sections.model";

export interface TeacherGroup {
    id: number;

    academic_staff_contract_id: number;
    course_id: number;
    grade_id: number;
    section_id: number;
    tutor: boolean;

    description: string | null;
    status: boolean;
    createdAt: string;
    updatedAt: string;

    academic_staff_contract: {
        id: number;

        year_id: number;
        academic_staff_id: number;
        start_date: string;
        end_date: string;
        position: string;

        description: string | null;
        status: boolean;
        createdAt: string;
        updatedAt: string;

        academic_staff: {
            id: number;

            personal_information_id: number;
            staff_type: string;

            description: string | null;
            status: boolean;
            createdAt: string;
            updatedAt: string;

            personal_information: {
                id: number;

                names: string;
                fathers_surname: string;
                mothers_surname: string;
                dni: string;
                email: string;
                phone_number: string;
                address: string;
                district: string;
                province: string;
                department: string;
                gender: string;

                description: string | null;
                status: boolean;
                createdAt: string;
                updatedAt: string;
            }
        }

        year: {
            id: number;
            year: number;
            description: string | null;
            status: boolean;
            createdAt: string;
            updatedAt: string;
        }
    },

    course: Course;

    grade: Grade;

    section: Section;
}