<?php

namespace Drupal\simple_oauth;

use Drupal\user\Entity\Role;

/**
 * OAuth2 scope provider.
 */
class Oauth2ScopeProvider implements Oauth2ScopeProviderInterface {

  /**
   * The OAuth2 scope adapter.
   *
   * @var \Drupal\simple_oauth\Oauth2ScopeAdapterInterface
   */
  protected Oauth2ScopeAdapterInterface $adapter;

  /**
   * Constructs Oauth2ScopeProvider.
   *
   * @param \Drupal\simple_oauth\Oauth2ScopeAdapterInterface $adapter
   *   The OAuth2 scope adapter.
   */
  public function __construct(Oauth2ScopeAdapterInterface $adapter) {
    $this->adapter = $adapter;
  }

  /**
   * {@inheritdoc}
   */
  public function load(string $id) {
    return $this->adapter->load($id);
  }

  /**
   * {@inheritdoc}
   */
  public function loadMultiple(array $ids = NULL): array {
    return $this->adapter->loadMultiple($ids);
  }

  /**
   * {@inheritdoc}
   */
  public function loadByName(string $name): ?Oauth2ScopeInterface {
    return $this->adapter->loadByName($name);
  }

  /**
   * {@inheritdoc}
   */
  public function loadMultipleByNames(array $names): array {
    return $this->adapter->loadMultipleByNames($names);
  }

  /**
   * {@inheritdoc}
   */
  public function loadChildren(string $parent_id): array {
    return $this->adapter->loadChildren($parent_id);
  }

  /**
   * {@inheritdoc}
   */
  public function getFlattenPermissionTree(Oauth2ScopeInterface $scope, array &$permissions = []): array {
    if (!$scope->isUmbrella()) {
      if ($scope->getGranularity() === Oauth2ScopeInterface::GRANULARITY_ROLE) {
        $user_role = Role::load($scope->getRole());
        if ($user_role) {
          foreach ($user_role->getPermissions() as $permission) {
            $permissions = $this->addPermission($permission, $permissions);
          }
        }
      }
      elseif ($scope->getGranularity() === Oauth2ScopeInterface::GRANULARITY_PERMISSION) {
        $permission = $scope->getPermission();
        if ($permission) {
          $permissions = $this->addPermission($permission, $permissions);
        }
      }
    }

    $children = $this->loadChildren($scope->id());

    foreach ($children as $child) {
      $this->getFlattenPermissionTree($child, $permissions);
    }

    sort($permissions);
    return $permissions;
  }

  /**
   * {@inheritdoc}
   */
  public function scopeHasPermission(string $permission, Oauth2ScopeInterface $scope): bool {
    if (!$scope->isUmbrella()) {
      if ($scope->getGranularity() === Oauth2ScopeInterface::GRANULARITY_ROLE) {
        /** @var \Drupal\user\RoleStorageInterface $storage */
        $storage = \Drupal::entityTypeManager()->getStorage('user_role');
        if ($storage->isPermissionInRoles($permission, [$scope->getRole()])) {
          return TRUE;
        }
      }
      elseif ($scope->getGranularity() === Oauth2ScopeInterface::GRANULARITY_PERMISSION) {
        if ($scope->getPermission() === $permission) {
          return TRUE;
        }
      }
    }

    $children = $this->loadChildren($scope->id());
    foreach ($children as $child) {
      if ($this->scopeHasPermission($permission, $child)) {
        return TRUE;
      }
    }

    return FALSE;
  }

  /**
   * Adds a permission to the flatten permission tree.
   *
   * @param string $permission
   *   The permission to add.
   * @param array $permissions
   *   The flatten permission tree.
   *
   * @return array
   *   The flatten permission tree.
   */
  private function addPermission(string $permission, array $permissions): array {
    if (!in_array($permission, $permissions)) {
      $permissions[] = $permission;
    }

    return $permissions;
  }

}
