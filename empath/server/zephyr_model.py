from transformers import pipeline

chatbot = pipeline("text-generation", 
                   model="HuggingFaceH4/zephyr-7b-beta",
                   device_map="auto")

def zephyr_response(query, max_length=200):
    prompt = f"You are a kind support assistant.\nUser: {query}\nAssistant:"
    output = chatbot(prompt, max_length=max_length, do_sample=True)
    return output[0]['generated_text'].replace(prompt, "").strip()