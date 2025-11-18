'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Plus, Trash2, Edit } from 'lucide-react'
import { toast } from 'sonner'

interface Permission {
  id: string
  name: string
  enabled: boolean
}

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: Permission[]
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([])
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user_roles')
    if (saved) {
      setRoles(JSON.parse(saved))
    } else {
      const defaultRoles: Role[] = [
        {
          id: '1',
          name: 'Administrator',
          description: 'Full system access',
          userCount: 2,
          permissions: [
            { id: 'view_cases', name: 'View Cases', enabled: true },
            { id: 'edit_cases', name: 'Edit Cases', enabled: true },
            { id: 'delete_cases', name: 'Delete Cases', enabled: true },
            { id: 'view_sensitive', name: 'View Sensitive Data', enabled: true },
            { id: 'manage_users', name: 'Manage Users', enabled: true },
            { id: 'send_messages', name: 'Send Messages', enabled: true },
            { id: 'view_audit', name: 'View Audit Logs', enabled: true },
          ],
        },
        {
          id: '2',
          name: 'Case Worker',
          description: 'Manage cases and communications',
          userCount: 6,
          permissions: [
            { id: 'view_cases', name: 'View Cases', enabled: true },
            { id: 'edit_cases', name: 'Edit Cases', enabled: true },
            { id: 'delete_cases', name: 'Delete Cases', enabled: false },
            { id: 'view_sensitive', name: 'View Sensitive Data', enabled: true },
            { id: 'manage_users', name: 'Manage Users', enabled: false },
            { id: 'send_messages', name: 'Send Messages', enabled: true },
            { id: 'view_audit', name: 'View Audit Logs', enabled: false },
          ],
        },
        {
          id: '3',
          name: 'Viewer',
          description: 'Read-only access',
          userCount: 4,
          permissions: [
            { id: 'view_cases', name: 'View Cases', enabled: true },
            { id: 'edit_cases', name: 'Edit Cases', enabled: false },
            { id: 'delete_cases', name: 'Delete Cases', enabled: false },
            { id: 'view_sensitive', name: 'View Sensitive Data', enabled: false },
            { id: 'manage_users', name: 'Manage Users', enabled: false },
            { id: 'send_messages', name: 'Send Messages', enabled: false },
            { id: 'view_audit', name: 'View Audit Logs', enabled: false },
          ],
        },
      ]
      setRoles(defaultRoles)
      localStorage.setItem('user_roles', JSON.stringify(defaultRoles))
    }
  }, [])

  const togglePermission = (roleId: string, permissionId: string) => {
    const updated = roles.map((role) => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: role.permissions.map((perm) =>
            perm.id === permissionId
              ? { ...perm, enabled: !perm.enabled }
              : perm
          ),
        }
      }
      return role
    })
    setRoles(updated)
    localStorage.setItem('user_roles', JSON.stringify(updated))
    toast.success('Permission updated')
  }

  const deleteRole = (id: string) => {
    const updated = roles.filter((r) => r.id !== id)
    setRoles(updated)
    localStorage.setItem('user_roles', JSON.stringify(updated))
    toast.success('Role deleted')
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{role.name}</h3>
                    <Badge variant="secondary">{role.userCount} users</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingRole(role)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {role.name !== 'Administrator' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteRole(role.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h4 className="text-sm font-medium">Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {role.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                    >
                      <Label
                        htmlFor={`${role.id}-${permission.id}`}
                        className="text-sm cursor-pointer"
                      >
                        {permission.name}
                      </Label>
                      <Switch
                        id={`${role.id}-${permission.id}`}
                        checked={permission.enabled}
                        onCheckedChange={() =>
                          togglePermission(role.id, permission.id)
                        }
                        disabled={role.name === 'Administrator'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Add New Role
      </Button>
    </div>
  )
}
