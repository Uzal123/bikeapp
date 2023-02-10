import React from "react";
import FrequentMessages from "../../assets/fakeData/FrequentMessages";

const CreateChat = ({
  setMessageModal,
  sendMessage,
  product,
  message,
  setMessage,
  peerId,
  productId,
}) => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-end overflow-y-auto bg-gray-600 bg-opacity-50 sm:justify-start">
      <div className="w-full px-2 transition-all transform sm:max-w-2xl flex justify-center items-center h-full">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-xl font-semibold">Send Message</h2>
            <div>
              <p>
                Send Message to {product.createdBy.fullName} about{" "}
                {product.title}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(FrequentMessages).map((key, i) => (
                <p
                  key={i}
                  value={key}
                  className="p-1 rounded-md bg-primary text-white cursor-pointer text-center text-sm"
                  onClick={() => setMessage(FrequentMessages[key])}
                >
                  {FrequentMessages[key]}
                </p>
              ))}
            </div>
            <input
              type="text"
              className="w-full border-2 border-gray-300 rounded-md p-2"
              placeholder="Enter your message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-around">
              <button
                className="bg-gray-400 rounded-md p-2 text-white px-6"
                onClick={() => setMessageModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary rounded-md p-2 text-white px-8"
                onClick={() => sendMessage(productId, peerId, message)}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;
