'use client';
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

const AddIdeaPage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = async (e)=> {
    e.preventDefault();
    const form = e.currentTarget;

    if (!session?.user?.email) {
      toast.error("Please login before adding an idea");
      router.push("/login");
      return;
    }

    const formData = new FormData(form);
    const ideaData = Object.fromEntries(formData.entries());
    ideaData.imageURL = ideaData.imageUrl;
    delete ideaData.imageUrl;
    ideaData.userEmail = session.user.email;
    ideaData.userName = session.user.name || "";
    ideaData.userImage = session.user.image || "";

    setSubmitting(true);

    try {
      const {data: tokenData} = await authClient.token()
          console.log(tokenData)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(ideaData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to add idea");
        return;
      }

      toast.success("Idea added successfully");
      form.reset();
      router.push("/ideas");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl text-center font-bold mb-4">Add New Idea</h1>
   <form onSubmit={onSubmit} className="p-10 space-y-8">

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


    <div className="md:col-span-2">
      <TextField name="title" isRequired>
        <Label>Idea Title</Label>
        <Input placeholder="e.g. AI Study Assistant for Students" />
        <FieldError />
      </TextField>
    </div>


    <div className="md:col-span-2">
      <TextField name="shortDescription" isRequired>
        <Label>Short Description</Label>
        <Input placeholder="One-line summary of your idea" />
        <FieldError />
      </TextField>
    </div>


    <div className="md:col-span-2">
      <TextField name="detailedDescription" isRequired>
        <Label>Detailed Description</Label>
        <TextArea placeholder="Explain your idea in detail..." />
        <FieldError />
      </TextField>
    </div>

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

   
    <TextField name="tags">
      <Label>Tags (Optional)</Label>
      <Input placeholder="e.g. AI, startup, productivity" />
      <FieldError />
    </TextField>


    <TextField name="imageUrl" isRequired>
      <Label>Image URL</Label>
      <Input placeholder="https://example.com/image.jpg" />
      <FieldError />
    </TextField>

   
    <TextField name="estimatedBudget">
      <Label>Estimated Budget (Optional)</Label>
      <Input type="number" placeholder="e.g. 5000" />
      <FieldError />
    </TextField>

   
    <TextField name="targetAudience" isRequired>
      <Label>Target Audience</Label>
      <Input placeholder="e.g. Students, Developers, Entrepreneurs" />
      <FieldError />
    </TextField>

   
    <div className="md:col-span-2">
      <TextField name="problemStatement" isRequired>
        <Label>Problem Statement</Label>
        <TextArea placeholder="What problem are you solving?" />
        <FieldError />
      </TextField>
    </div>

  
    <div className="md:col-span-2">
      <TextField name="proposedSolution" isRequired>
        <Label>Proposed Solution</Label>
        <TextArea placeholder="How will your idea solve this problem?" />
        <FieldError />
      </TextField>
    </div>

  </div>


  <Button type="submit" isDisabled={isPending || submitting} className="w-full bg-blue-600 text-white py-6">
    {submitting ? "Submitting..." : "Submit Idea"}
  </Button>

</form>
      
    </div>
  );
};

export default AddIdeaPage;
