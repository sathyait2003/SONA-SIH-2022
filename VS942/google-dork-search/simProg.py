import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
def similarity_fun():
        student_files = [doc for doc in os.listdir() if doc.endswith('.txt')]
        student_notes =[open(File).read() for File in  student_files]
        no_of_items = len(student_files)
        global s_vectors
        if no_of_items>1:
                vectorize = lambda Text: TfidfVectorizer().fit_transform(Text).toarray()
                similarity = lambda doc1, doc2: cosine_similarity([doc1, doc2])

                vectors = vectorize(student_notes)
                s_vectors = list(zip(student_files, vectors))

                def check_plagiarism():
                        plagiarism_results = set()
                        global s_vectors
                        for student_a, text_vector_a in s_vectors:
                                new_vectors =s_vectors.copy()
                                current_index = new_vectors.index((student_a, text_vector_a))
                                del new_vectors[current_index]
                                for student_b , text_vector_b in new_vectors:
                                        sim_score = similarity(text_vector_a, text_vector_b)[0][1]
                                        student_pair = sorted((student_a, student_b))
                                        score = (student_pair[0], student_pair[1],round(sim_score*100))
                                        plagiarism_results.add(score)
                        return plagiarism_results
                full_data = []
                for data in check_plagiarism():
                        full_data.append(data)
                        print(data)
        else:
                full_data = [student_files[0],"", 0]
                print(student_files[0])
        return full_data
