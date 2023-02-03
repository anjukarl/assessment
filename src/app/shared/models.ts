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
  subject_code: string;
  topic_code: string;
  topic_name: string;
}

export interface QandA {
  id?: string;
  univ_name: string;
  exam_name: string;
  year: string;
  subject_code: string;
  topic_code: string;
  question: string;
  answer: string;
  marks: number;
}

export interface Paper {
  id?: string;
  univ_name: string;
  exam_name: string;
  subject_code: string;
  paper_id: string;
  downloadUrl: string;
}
