from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
from sentence_transformers import SentenceTransformer
import faiss, os

token = "hf_your_token_here"  # Replace with your actual token

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2",
                                           token=token)

print("Loading model...")
model = AutoModelForCausalLM.from_pretrained("mistralai/Mistral-7B-Instruct-v0.2", 
                                             token=token,
                                             device_map="auto")

embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Change the working directory to the desired folder
os.chdir(r"C:\Users\eshil\OneDrive\Desktop\hackathon\Innovate Health\empath-innovate-health\empath\server")

data_dir = os.path.join(".", "data")

if not os.path.exists(data_dir):
    raise FileNotFoundError(f"❌ Folder not found: {data_dir}")

docs = [open(os.path.join(data_dir, f), "r", encoding="utf-8").read() for f in os.listdir(data_dir)]

doc_vecs = embedder.encode(docs)
index = faiss.IndexFlatL2(doc_vecs[0].shape[0])
index.add(doc_vecs)

def retrieve(query, k=3):
    query_vec = embedder.encode([query])
    _, idxs = index.search(query_vec, k)
    return [docs[i] for i in idxs[0]]

def mistral_rag_response(query):
    context = "\n".join(retrieve(query))
    prompt = f"""You are a trauma-informed support assistant. Use this context to help answer empathetically.

    Context:
    {context}

    User: {query}
    """
    return mistral(prompt, max_length=300, do_sample=True)[0]["generated_text"]

