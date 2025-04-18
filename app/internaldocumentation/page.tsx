import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import api from '@api/client';

// Components
import DocsSidebar from '@components/docs/DocsSidebar';
import MDXRenderer from '@components/docs/MDXRenderer';
import DocEditor from '@components/docs/DocEditor';

export default function Documentation() {
  const { docPath = '' } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  // Fetch documentation content
  const { data: docContent, isLoading } = useQuery({
    queryKey: ['doc', docPath],
    queryFn: () => api.get(`/docs/${docPath}`).then(res => res.data)
  });

  // Mutation for updating docs
  const updateDoc = useMutation({
    mutationFn: (newContent: string) => 
      api.put(`/docs/${docPath}`, { content: newContent }),
    onSuccess: () => {
      setIsEditing(false);
    }
  });

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Documentation Sidebar */}
      <DocsSidebar className="w-64 border-r border-gray-200 overflow-y-auto" />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-brand-secondary">
              {docPath || 'Documentation'}
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-accent rounded-md hover:bg-accent-400"
            >
              {isEditing ? 'Preview' : 'Edit'}
            </button>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="animate-pulse">Loading...</div>
          ) : isEditing ? (
            <DocEditor
              initialContent={docContent}
              onSave={(content) => updateDoc.mutate(content)}
            />
          ) : (
            <MDXProvider components={{}}>
              <MDXRenderer content={docContent} />
            </MDXProvider>
          )}
        </div>
      </div>
    </div>
  );
} 