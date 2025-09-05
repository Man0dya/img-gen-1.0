import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt, getApiBaseUrl } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })

  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await fetch(`${getApiBaseUrl()}/api/v1/imgGen`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        setForm({ ...form, photo: data.photo })

      } catch (error) {
        alert('Error generating image. Please try again later.')
        console.error('Error generating image:', error)
      } finally {
        setGeneratingImg(false)
      }

    } else {
      alert('Please provide a prompt')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      try {
        setLoading(true)
        const response = await fetch(`${getApiBaseUrl()}/api/v1/post`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        })

        await response.json()
        alert('Success!')
        navigate('/')
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    } else {
      alert('Please generate an image with a prompt')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Your Masterpiece
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your imagination into stunning visuals with AI-powered generation.
            Join our creative community and share your unique artwork.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                LabelName="Artist Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                handleChange={handleChange}
              />

              <FormField
                LabelName="Creative Prompt"
                type="text"
                name="prompt"
                placeholder="Describe your vision in detail..."
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
              />

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={generateImage}
                  disabled={generatingImg}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingImg ? 'Creating Magic...' : 'Generate Image'}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sharing with Community...' : 'Share with Community'}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Preview</h3>

            <div className="relative w-full max-w-sm aspect-square bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="text-center">
                  <img
                    src={preview}
                    alt="preview"
                    className="w-24 h-24 mx-auto mb-4 opacity-40"
                  />
                  <p className="text-gray-500 text-sm">Your masterpiece will appear here</p>
                </div>
              )}

              {generatingImg && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Loader />
                    <p className="mt-2 text-sm">Generating...</p>
                  </div>
                </div>
              )}
            </div>

            {form.photo && (
              <p className="text-sm text-gray-600 mt-4 text-center max-w-xs">
                Ready to share? Your creation is looking amazing!
              </p>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Pro Tips for Better Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">🎨</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Be Specific</h4>
              <p className="text-sm text-gray-600">Describe details like style, colors, and mood</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">✨</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Experiment</h4>
              <p className="text-sm text-gray-600">Try different prompts and use Surprise Me</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">🌟</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Share & Inspire</h4>
              <p className="text-sm text-gray-600">Contribute to the community gallery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
