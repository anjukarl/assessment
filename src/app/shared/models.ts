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
  question: string;
  answer: string;
  marks: number;
}

export interface Assessment {
  id?: string;
  univ_name: string;
  exam_name: string;
  subject_name: string;
  assessmentId: string;
  downloadUrl: string;
}
