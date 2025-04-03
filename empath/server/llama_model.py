from transformers import AutoTokenizer, AutoModelForCausalLM

token = "hf_your_token_here"  # Replace with your actual token

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-7b-chat-hf",
                                          token=token)
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-chat-hf",
                                               token=token,
                                               device_map="auto")

def llama_response(query):
    inputs = tokenizer(f"You are a gentle assistant. {query}", return_tensors="pt")
    outputs = model.generate(**inputs, max_length=256)
    return tokenizer.decode(outputs[0], skip_special_tokens=True)
