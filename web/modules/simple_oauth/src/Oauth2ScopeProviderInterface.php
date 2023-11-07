<?php

namespace Drupal\simple_oauth;

/**
 * The OAuth2 scope provider interface.
 */
interface Oauth2ScopeProviderInterface extends Oauth2ScopeAdapterInterface {

  /**
   * Get flatten permission tree by scope.
   *
   * @param \Drupal\simple_oauth\Oauth2ScopeInterface $scope
   *   The parent scope.
   * @param array $permissions
   *   Permissions reference array.
   *
   * @return array
   *   Returns permission in an array sorted by value.
   */
  public function getFlattenPermissionTree(Oauth2ScopeInterface $scope, array &$permissions = []): array;


  /**
   * Checks if the scope has a permission.
   *
   * @param string $permission
   *    The permission to check for.
   * @param \Drupal\simple_oauth\Oauth2ScopeInterface $scope
   *   The scope to check.
   *
   * @return bool
   *   TRUE if the role has the permission, FALSE if not.
   */
  public function scopeHasPermission(string $permission, Oauth2ScopeInterface $scope): bool;

}
