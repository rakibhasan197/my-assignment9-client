'use client';
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import React from 'react';

const AddIdeaPage = () => {
  const onSubmit = async (e)=> {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ideaData = Object.fromEntries(formData.entries())
    console.log(ideaData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ideaData),
    })
    const data = await res.json();
    console.log(data);
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl text-center font-bold mb-4">Add New Idea</h1>
   <form onSubmit={onSubmit} className="p-10 space-y-8">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

    {/* Idea Title */}
    <div className="md:col-span-2">
      <TextField name="title" isRequired>
        <Label>Idea Title</Label>
        <Input placeholder="e.g. AI Study Assistant for Students" />
        <FieldError />
      </TextField>
    </div>

    {/* Short Description */}
    <div className="md:col-span-2">
      <TextField name="shortDescription" isRequired>
        <Label>Short Description</Label>
        <Input placeholder="One-line summary of your idea" />
        <FieldError />
      </TextField>
    </div>

    {/* Detailed Description */}
    <div className="md:col-span-2">
      <TextField name="detailedDescription" isRequired>
        <Label>Detailed Description</Label>
        <TextArea placeholder="Explain your idea in detail..." />
        <FieldError />
      </TextField>
    </div>

    {/* Category */}
    <div>
      <Label>Category</Label>
      <Select name="category" isRequired placeholder="Select category">
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="Tech" textValue="Tech">Tech</ListBox.Item>
            <ListBox.Item id="Health" textValue="Health">Health</ListBox.Item>
            <ListBox.Item id="AI" textValue="AI">AI</ListBox.Item>
            <ListBox.Item id="Education" textValue="Education">Education</ListBox.Item>
            <ListBox.Item id="Finance" textValue="Finance">Finance</ListBox.Item>
            <ListBox.Item id="Lifestyle" textValue="Lifestyle">Lifestyle</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
    </div>

    {/* Tags */}
    <TextField name="tags">
      <Label>Tags (Optional)</Label>
      <Input placeholder="e.g. AI, startup, productivity" />
      <FieldError />
    </TextField>

    {/* Image URL */}
    <TextField name="imageUrl" isRequired>
      <Label>Image URL</Label>
      <Input placeholder="https://example.com/image.jpg" />
      <FieldError />
    </TextField>

    {/* Estimated Budget */}
    <TextField name="estimatedBudget">
      <Label>Estimated Budget (Optional)</Label>
      <Input type="number" placeholder="e.g. 5000" />
      <FieldError />
    </TextField>

    {/* Target Audience */}
    <TextField name="targetAudience" isRequired>
      <Label>Target Audience</Label>
      <Input placeholder="e.g. Students, Developers, Entrepreneurs" />
      <FieldError />
    </TextField>

    {/* Problem Statement */}
    <div className="md:col-span-2">
      <TextField name="problemStatement" isRequired>
        <Label>Problem Statement</Label>
        <TextArea placeholder="What problem are you solving?" />
        <FieldError />
      </TextField>
    </div>

    {/* Proposed Solution */}
    <div className="md:col-span-2">
      <TextField name="proposedSolution" isRequired>
        <Label>Proposed Solution</Label>
        <TextArea placeholder="How will your idea solve this problem?" />
        <FieldError />
      </TextField>
    </div>

  </div>

  {/* Submit Button */}
  <Button type="submit" className="w-full bg-blue-600 text-white py-6">
    Submit Idea
  </Button>

</form>
      
    </div>
  );
};

export default AddIdeaPage;