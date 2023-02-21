import { serverTimestamp } from 'firebase/firestore';

export interface Univ {
  id?: string;
  univ_name: string;
}

export interface Exam {
  id?: string;
  univ_name: string;
  exam_name: string;
}

export interface Subject {
  id?: string;
  exam_name: string;
  subject_code: string;
  subject_name: string;
}

export interface Topic {
  id?: string;
  subject_name: string;
  topic_code: string;
  topic_name: string;
}

export interface QandA {
  id?: string;
  exam_name: string;
  year: string;
  subject_name: string;
  topic_code: string;
  marks: number;
  q_filename: string;
  a_filename: string;
  q_url: string;
  a_url: string;
}

export interface Assessment {
  id?: string;
  exam_name: string;
  subject_name: string;
  as_filename: string;
  as_id: string;
  as_url: string;
  marks: number;
}
